# scripts/build_all_200_discussions.py
import json
import os
import sys

# Ensure scripts dir is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import all 8 batches
from disc_batch_1_25 import DISCUSSIONS_1_25
from disc_batch_26_50 import DISCUSSIONS_26_50
from disc_batch_51_75 import DISCUSSIONS_51_75
from disc_batch_76_100 import DISCUSSIONS_76_100
from disc_batch_101_125 import DISCUSSIONS_101_125
from disc_batch_126_150 import DISCUSSIONS_126_150
from disc_batch_151_175 import DISCUSSIONS_151_175
from disc_batch_176_200 import DISCUSSIONS_176_200

ALL_BATCHES = [
    DISCUSSIONS_1_25,
    DISCUSSIONS_26_50,
    DISCUSSIONS_51_75,
    DISCUSSIONS_76_100,
    DISCUSSIONS_101_125,
    DISCUSSIONS_126_150,
    DISCUSSIONS_151_175,
    DISCUSSIONS_176_200
]

all_items = []
for b in ALL_BATCHES:
    all_items.extend(b)

print(f"Total merged items: {len(all_items)}")

# Clean and normalize strings
def clean_text(txt):
    if not isinstance(txt, str):
        return txt
    # Clean corrupt replacement characters
    return txt.replace("", "—").replace("\ufffd", "—")

def extract_exact_context(term, old_context, essay):
    # 1. Exact match already?
    if old_context.lower() in essay.lower():
        idx = essay.lower().find(old_context.lower())
        return essay[idx:idx + len(old_context)]
    
    # 2. Look for term
    t_low = term.lower()
    e_low = essay.lower()
    
    if t_low in e_low:
        idx = e_low.find(t_low)
        # Find sentence boundaries
        s_start = max(0, essay.rfind(".", 0, idx) + 1)
        semi_start = essay.rfind(";", 0, idx)
        if semi_start > s_start:
            s_start = semi_start + 1
        s_end = essay.find(".", idx)
        if s_end == -1:
            s_end = len(essay)
        semi_end = essay.find(";", idx)
        if semi_end != -1 and semi_end < s_end:
            s_end = semi_end
            
        full_clause = essay[s_start:s_end].strip()
        if len(full_clause) <= 100:
            return full_clause
        
        # If clause is long, take a window around the term
        w_start = max(0, idx - 25)
        w_end = min(len(essay), idx + len(term) + 35)
        # Snap to spaces
        if w_start > 0:
            sp = essay.find(" ", w_start)
            if sp != -1 and sp < idx:
                w_start = sp + 1
        if w_end < len(essay):
            sp = essay.rfind(" ", idx + len(term), w_end)
            if sp != -1:
                w_end = sp
        return essay[w_start:w_end].strip()
    
    # 3. Look for words in term
    words = [w for w in term.lower().split() if len(w) > 3]
    for w in words:
        if w in e_low:
            idx = e_low.find(w)
            w_start = max(0, idx - 20)
            w_end = min(len(essay), idx + 50)
            if w_start > 0:
                sp = essay.find(" ", w_start)
                if sp != -1:
                    w_start = sp + 1
            if w_end < len(essay):
                sp = essay.rfind(" ", idx, w_end)
                if sp != -1:
                    w_end = sp
            return essay[w_start:w_end].strip()

    return old_context

# Rigorous validation
errors = []
expected_ids = [f"sample_discussion_generated_{i}" for i in range(1, 201)]
actual_ids = [item["id"] for item in all_items]

if actual_ids != expected_ids:
    errors.append("IDs do not match expected sequence 1..200")
    for i, (act, exp) in enumerate(zip(actual_ids, expected_ids)):
        if act != exp:
            errors.append(f"Mismatch at index {i}: got {act}, expected {exp}")

word_counts = []
category_counts = {}

for idx, item in enumerate(all_items, start=1):
    # Clean text in prompt and essay
    p = item["prompt"]
    p["professorQuestion"] = clean_text(p["professorQuestion"])
    for op in p.get("studentOpinions", []):
        if "stance" in op:
            op["stance"] = clean_text(op["stance"])
        if "opinion" in op:
            op["opinion"] = clean_text(op["opinion"])
        # ensure both stance and opinion are present
        if "stance" in op and "opinion" not in op:
            op["opinion"] = op["stance"]
        elif "opinion" in op and "stance" not in op:
            op["stance"] = op["opinion"]

    item["modelEssay"] = clean_text(item["modelEssay"])
    essay = item["modelEssay"]
    words = essay.split()
    wc = len(words)
    item["wordCount"] = wc
    word_counts.append(wc)

    cat = item.get("topicCategory", "Uncategorized")
    category_counts[cat] = category_counts.get(cat, 0) + 1

    if not (110 <= wc <= 145):
        errors.append(f"[{item['id']}] word count {wc} out of range [110, 145]")

    vocabs = item.get("vocabularyHighlights", [])
    if len(vocabs) != 4:
        errors.append(f"[{item['id']}] expected 4 vocabulary highlights, found {len(vocabs)}")

    for v_idx, v in enumerate(vocabs, 1):
        v["term"] = clean_text(v.get("term", ""))
        v["meaning"] = clean_text(v.get("meaning", ""))
        old_ctx = clean_text(v.get("contextInEssay", ""))
        
        # Normalize context
        exact_ctx = extract_exact_context(v["term"], old_ctx, essay)
        v["contextInEssay"] = exact_ctx

        if exact_ctx.lower() not in essay.lower():
            errors.append(f"[{item['id']}] vocab #{v_idx} context not found in essay: '{exact_ctx}' (term: '{v['term']}')")

    struct = item.get("structureAnalysis", "")
    item["structureAnalysis"] = clean_text(struct)
    if not struct or struct.count("•") < 3:
        errors.append(f"[{item['id']}] structureAnalysis missing or less than 3 bullets")

if errors:
    print(f"FAILED validation with {len(errors)} errors:")
    for e in errors[:25]:
        print("  -", e)
    if len(errors) > 25:
        print(f"  ... and {len(errors) - 25} more errors")
    sys.exit(1)

print("ALL 200 ITEMS VALIDATED PERFECTLY!")
print(f"Word count range: {min(word_counts)} to {max(word_counts)} words (avg: {sum(word_counts)/len(word_counts):.1f})")
print(f"Category breakdown ({len(category_counts)} categories):")
for cat, cnt in sorted(category_counts.items()):
    print(f"  • {cat}: {cnt} items")

# Destination paths
root_target = os.path.abspath("writing_discussion_samples_toefl_2026.json")
public_target = os.path.abspath("public/writing_discussion_samples_toefl_2026.json")
src_target = os.path.abspath("src/data/writing_discussion_samples_toefl_2026.json")

# Ensure directories exist
os.makedirs("public", exist_ok=True)
os.makedirs("src/data", exist_ok=True)

# Write master files
for path in [root_target, public_target, src_target]:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(all_items, f, indent=2, ensure_ascii=False)
    print(f"Saved master file: {path} ({os.path.getsize(path):,} bytes)")

# Write chunked files for user convenience
chunks = [
    ("1_50", all_items[0:50]),
    ("51_100", all_items[50:100]),
    ("101_150", all_items[100:150]),
    ("151_200", all_items[150:200])
]

for label, chunk_data in chunks:
    chunk_root = f"writing_discussion_samples_{label}.json"
    chunk_pub = f"public/writing_discussion_samples_{label}.json"
    for cp in [chunk_root, chunk_pub]:
        with open(cp, "w", encoding="utf-8") as f:
            json.dump(chunk_data, f, indent=2, ensure_ascii=False)
        print(f"Saved chunk: {cp} ({len(chunk_data)} items)")

print("\nAll 200 Academic Discussion samples assembled, validated, and exported successfully!")

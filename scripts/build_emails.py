# -*- coding: utf-8 -*-
"""
Script to validate and export all 50 TOEFL iBT 2026 Academic Email Prompts and Band 5/5 Model Essays.
"""

import json
import os
import sys

from email_data_part1 import EMAILS_PART_1
from email_data_part2 import EMAILS_PART_2

def main():
    all_emails = EMAILS_PART_1 + EMAILS_PART_2
    print(f"Total email samples loaded: {len(all_emails)}")
    assert len(all_emails) == 50, f"Expected 50 items, got {len(all_emails)}"

    # Validate each item
    for i, item in enumerate(all_emails, start=1):
        expected_id = f"sample_email_generated_{i}"
        assert item["id"] == expected_id, f"Item {i} has id {item['id']}, expected {expected_id}"
        assert item["type"] == "email"
        assert item["targetBand"] == "Band 5.0 / 5.0"
        
        # Word count calculation
        essay = item["modelEssay"]
        actual_words = len([w for w in essay.split() if w.strip()])
        item["wordCount"] = actual_words
        
        # Check word count bounds (95 to 135 words)
        if not (95 <= actual_words <= 135):
            print(f"Warning: Item {item['id']} has {actual_words} words (essay: {item['title']})")
        
        # Check requirements
        reqs = item["prompt"]["requirements"]
        assert len(reqs) == 3, f"Item {item['id']} should have exactly 3 requirements"
        
        # Check vocab terms exist in essay
        for vocab in item["vocabularyHighlights"]:
            term = vocab["term"]
            # Flexible case-insensitive check
            if term.lower() not in essay.lower():
                print(f"Warning: Vocab term '{term}' not directly found in essay of {item['id']}")

    print("All 50 items successfully validated!")

    # Output paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    root_output = os.path.join(base_dir, "writing_email_samples_toefl_2026.json")
    public_output = os.path.join(base_dir, "public", "writing_email_samples_toefl_2026.json")
    src_data_dir = os.path.join(base_dir, "src", "data")
    os.makedirs(src_data_dir, exist_ok=True)
    src_output = os.path.join(src_data_dir, "writing_email_samples_toefl_2026.json")

    # Serialize with pretty Vietnamese unicode
    json_content = json.dumps(all_emails, ensure_ascii=False, indent=2)

    for path in [root_output, public_output, src_output]:
        with open(path, "w", encoding="utf-8") as f:
            f.write(json_content)
        print(f"Saved: {path} ({os.path.getsize(path):,} bytes)")

if __name__ == "__main__":
    main()

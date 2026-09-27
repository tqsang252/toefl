# -*- coding: utf-8 -*-
"""
Build final completeTheWordsData.js containing all 100 ETS 2026 C-Test passages.
"""
import json
import scripts.ctw_data.domain1_natural_sciences as d1
import scripts.ctw_data.domain2_social_sciences as d2
import scripts.ctw_data.domain3_arts_humanities as d3
import scripts.ctw_data.domain4_applied_tech as d4
from scripts.generate_100_ctw import process_passage

all_raw = (
    d1.domain1_items +
    d2.domain2_items +
    d3.domain3_items +
    d4.domain4_items
)

print(f"Total raw passages collected: {len(all_raw)}")

processed = []
for idx, item in enumerate(all_raw, 1):
    p = process_passage(item)
    processed.append(p)

print(f"Total processed passages: {len(processed)}")

# Format JavaScript output
js_content = """/**
 * TOEFL iBT 2026 OFFICIAL FORMAT: COMPLETE THE WORDS (C-TEST) BANK
 * 100 Authentic Academic & Campus Passages
 * 
 * ETS 2026 Specifications:
 * - 70-100 words academic/campus reading passages across 4 major domains
 * - First sentence is 100% complete and establishes full context
 * - 10 target words starting from sentence 2 are truncated according to C-Test rule:
 *     prefix = first ceil/floor half of letters (provided)
 *     missing = remaining letters to type in
 * - Standard TOEFL pacing: ~90 seconds per passage (9 seconds / word)
 */

export const CTW_DOMAINS = [
  'All Domains',
  'Natural Sciences',
  'Social Sciences',
  'Arts & Humanities',
  'Applied Tech & Engineering'
];

export const COMPLETE_THE_WORDS_BANK = """ + json.dumps(processed, indent=2, ensure_ascii=False) + """;
"""

target_path = "src/data/completeTheWordsData.js"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Wrote {len(processed)} passages successfully to {target_path}")

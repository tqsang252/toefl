import json
import os
import re

import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import scripts.email_data_part1 as p1
import scripts.email_data_part2 as p2
import scripts.batch_51_75 as b1
import scripts.batch_76_100 as b2
import scripts.batch_101_125 as b3
import scripts.batch_126_150 as b4
import scripts.batch_151_175 as b5
import scripts.batch_176_200 as b6

def clean_word_count(text):
    # Standard TOEFL word count splitting
    words = [w for w in re.split(r'\s+', text.strip()) if w]
    return len(words)

def main():
    all_emails = (
        p1.EMAILS_PART_1 +
        p2.EMAILS_PART_2 +
        b1.BATCH_51_75 +
        b2.BATCH_76_100 +
        b3.BATCH_101_125 +
        b4.BATCH_126_150 +
        b5.BATCH_151_175 +
        b6.BATCH_176_200
    )

    print(f"Total emails collected: {len(all_emails)}")
    assert len(all_emails) == 200, f"Expected 200 emails, got {len(all_emails)}"

    # Validate and standardize
    word_counts = []
    for i, email in enumerate(all_emails, 1):
        expected_id = f"sample_email_generated_{i}"
        assert email["id"] == expected_id, f"Item {i} has id {email['id']} != {expected_id}"
        
        wc = clean_word_count(email["modelEssay"])
        email["wordCount"] = wc
        word_counts.append(wc)
        
        # Ensure metadata consistency
        email["targetBand"] = "Band 5.0 / 5.0"
        email["recommendedWords"] = "100 - 130 words (7 minutes)"
        
        # Verify required fields
        assert "title" in email and email["title"], f"Missing title in {email['id']}"
        assert "topicCategory" in email and email["topicCategory"], f"Missing topicCategory in {email['id']}"
        assert "prompt" in email and email["prompt"], f"Missing prompt in {email['id']}"
        assert "modelEssay" in email and email["modelEssay"], f"Missing modelEssay in {email['id']}"
        assert "vocabularyHighlights" in email and len(email["vocabularyHighlights"]) >= 3, f"Insufficient vocab in {email['id']}"
        assert "structureAnalysis" in email and len(email["structureAnalysis"]) >= 3, f"Insufficient structure in {email['id']}"

    print(f"Validation passed successfully!")
    print(f"Word count range: {min(word_counts)} to {max(word_counts)} words (Average: {sum(word_counts)/len(word_counts):.1f} words)")

    # Output paths
    root_file = "writing_email_samples_toefl_2026.json"
    public_file = os.path.join("public", "writing_email_samples_toefl_2026.json")
    src_file = os.path.join("src", "data", "writing_email_samples_toefl_2026.json")

    # Save master 200 items
    with open(root_file, "w", encoding="utf-8") as f:
        json.dump(all_emails, f, ensure_ascii=False, indent=2)
    print(f"Saved: {root_file} ({len(all_emails)} items)")

    with open(public_file, "w", encoding="utf-8") as f:
        json.dump(all_emails, f, ensure_ascii=False, indent=2)
    print(f"Saved: {public_file} ({len(all_emails)} items)")

    with open(src_file, "w", encoding="utf-8") as f:
        json.dump(all_emails, f, ensure_ascii=False, indent=2)
    print(f"Saved: {src_file} ({len(all_emails)} items)")

    # Also save separate convenience files for user upload
    # 1. 51-100 (50 items)
    emails_51_100 = all_emails[50:100]
    with open("writing_email_samples_51_100.json", "w", encoding="utf-8") as f:
        json.dump(emails_51_100, f, ensure_ascii=False, indent=2)
    print(f"Saved: writing_email_samples_51_100.json ({len(emails_51_100)} items)")

    # 2. 101-150 (50 items)
    emails_101_150 = all_emails[100:150]
    with open("writing_email_samples_101_150.json", "w", encoding="utf-8") as f:
        json.dump(emails_101_150, f, ensure_ascii=False, indent=2)
    print(f"Saved: writing_email_samples_101_150.json ({len(emails_101_150)} items)")

    # 3. 151-200 (50 items)
    emails_151_200 = all_emails[150:200]
    with open("writing_email_samples_151_200.json", "w", encoding="utf-8") as f:
        json.dump(emails_151_200, f, ensure_ascii=False, indent=2)
    print(f"Saved: writing_email_samples_151_200.json ({len(emails_151_200)} items)")

    # 4. 51-200 (150 items - the exact batch requested in this task)
    emails_51_200 = all_emails[50:200]
    with open("writing_email_samples_51_200.json", "w", encoding="utf-8") as f:
        json.dump(emails_51_200, f, ensure_ascii=False, indent=2)
    print(f"Saved: writing_email_samples_51_200.json ({len(emails_51_200)} items)")

if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""
Production generator for 100 Authentic ETS 2026 Complete the Words Passages
"""
import json
import re

def truncate_word(word):
    clean = re.sub(r'[^a-zA-Z]', '', word)
    p_len = max(1, len(clean) // 2)
    prefix = clean[:p_len]
    missing = clean[p_len:]
    return prefix, missing, clean

def process_passage(item):
    body = item["body"]
    targets = item["targets"] # list of 10 tuples: (word, hint_vi, pos)
    
    if len(targets) != 10:
        raise ValueError(f"Passage {item['id']} must have exactly 10 targets, got {len(targets)}")
    
    result = body
    blanks = []
    
    for idx, (target, hint_vi, pos) in enumerate(targets, 1):
        pattern = re.compile(r'\b(' + re.escape(target) + r')\b', re.IGNORECASE)
        match = pattern.search(result)
        if not match:
            raise ValueError(f"Passage {item['id']}: Target word '{target}' not found in body text:\n{body}")
        
        found = match.group(1)
        prefix, missing, clean = truncate_word(found)
        replacement = f"[{prefix}|{missing}]"
        
        result = result[:match.start()] + replacement + result[match.end():]
        blanks.append({
            "index": idx,
            "prefix": prefix,
            "missing": missing,
            "fullWord": clean,
            "missingLength": len(missing),
            "pos": pos,
            "hint": hint_vi
        })
        
    full_text = f"{item['leadSentence']} {body}"
    
    return {
        "id": item["id"],
        "title": item["title"],
        "topic": item["topic"],
        "category": item["category"],
        "leadSentence": item["leadSentence"],
        "bodyTemplate": result,
        "fullText": full_text,
        "blanks": blanks
    }

print("Loaded generator core functions.")

import json
import re

transcript_path = r"C:\Users\Sang Tong\.gemini\antigravity\brain\fb80ebd3-49ba-4259-bf5c-c2fbb7553313\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

user_inputs = []
for line in lines:
    try:
        obj = json.loads(line)
        if obj.get("type") == "USER_INPUT":
            user_inputs.append(obj)
    except:
        pass

print(f"Total user inputs: {len(user_inputs)}")
last_input = user_inputs[-1]
content = last_input.get("content", "")
print(f"Last input content length: {len(content)}")

# Find JSON array in content
match = re.search(r'\[\s*\{.*\}\s*\]', content, re.DOTALL)
if match:
    json_str = match.group(0)
    data = json.loads(json_str)
    print(f"Successfully parsed JSON array with {len(data)} items!")
    with open("scripts/raw_discussion_input.json", "w", encoding="utf-8") as out:
        json.dump(data, out, ensure_ascii=False, indent=2)
    print("Saved to scripts/raw_discussion_input.json")
else:
    print("Could not find JSON array via regex, checking start...")
    start_idx = content.find('[')
    end_idx = content.rfind(']')
    if start_idx != -1 and end_idx != -1:
        json_str = content[start_idx:end_idx+1]
        data = json.loads(json_str)
        print(f"Parsed via substring with {len(data)} items!")
        with open("scripts/raw_discussion_input.json", "w", encoding="utf-8") as out:
            json.dump(data, out, ensure_ascii=False, indent=2)
        print("Saved to scripts/raw_discussion_input.json")

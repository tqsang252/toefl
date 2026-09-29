import json

with open('scripts/raw_discussion_200.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def show_range(start, end):
    for i in range(start, end):
        d = data[i]
        print(f"=== {i+1}: {d.get('id')} - {d.get('title')} ({d.get('topicCategory')}) ===")
        p = d.get('prompt', {})
        print(f"Prof: {p.get('professorName')} ({p.get('professorTitle')})")
        print(f"Question: {p.get('professorQuestion')}")
        opinions = p.get('studentOpinions', [])
        for o in opinions:
            print(f"  - {o.get('student')}: {o.get('stance') or o.get('opinion')}")
        print()

if __name__ == '__main__':
    show_range(150, 175)

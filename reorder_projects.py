import bs4
import os

filepath = r'c:\Users\91936\.gemini\antigravity-ide\scratch\reje-groups\projects.html'

with open(filepath, 'r', encoding='utf-8') as f:
    soup = bs4.BeautifulSoup(f, 'html.parser')

grid = soup.find('div', class_='projects-grid')

target_projects = [
    "Krusadai Island dredging project",
    "Pudukkupam - Groyne Work",
    "Jegathapattinam Fishing Harbour Project",
    "Tuticorin Fishing Harbour Project",
    "Chandrapadi Dredfing Project"
]

project_cards = grid.find_all('div', class_='project-card', recursive=False)

extracted_cards = []
remaining_cards = []

# First pass: categorize cards
for card in project_cards:
    title_el = card.find('h3', class_='project-title')
    if title_el:
        title = title_el.text.strip()
        # Check if it matches any target exactly
        found = False
        for t in target_projects:
            if t.lower() in title.lower():
                extracted_cards.append((t, card))
                found = True
                break
        if not found:
            remaining_cards.append(card)
    else:
        remaining_cards.append(card)

# Sort extracted cards to match target_projects order
ordered_cards = []
for target in target_projects:
    for t, card in extracted_cards:
        if t == target:
            ordered_cards.append(card)
            break

# Clear the grid
grid.clear()

# Add them back in the new order
for card in ordered_cards:
    grid.append(card)
for card in remaining_cards:
    grid.append(card)

# Write back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(str(soup))

print("Reordered projects successfully.")

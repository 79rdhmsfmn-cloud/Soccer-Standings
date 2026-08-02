import json
import requests
from bs4 import BeautifulSoup

URL = "https://ss-nb.org"
headers = {"User-Agent": "Mozilla/5.0"}

try:
    response = requests.get(URL, headers=headers, timeout=10)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the "League" standings section header
    league_heading = soup.find(lambda tag: tag.name in ["h3", "h4", "div"] and "League" in tag.text)
    standings_table = league_heading.find_next("table")

    standings_data = []

    for row in standings_table.find_all("tr"):
        cells = row.find_all("td")
        # Skip rows that don't have exactly 7 columns (Rank, Team, GP, W, L, T, Pts)
        if len(cells) < 7:
            continue
        
        # Correctly grab each item by its list position index [0 to 6]
        record = {
            "rank": cells[0].text.strip(),
            "team": cells[1].text.strip(),
            "gp": cells[2].text.strip(),
            "w": cells[3].text.strip(),
            "l": cells[4].text.strip(),
            "t": cells[5].text.strip(),
            "points": cells[6].text.strip()
        }
        standings_data.append(record)

    # Save the clean data to the json file
    with open("standings.json", "w", encoding="utf-8") as file:
        json.dump(standings_data, file, indent=4)
    print("Successfully updated standings.json")

except Exception as e:
    print(f"Error occurred: {e}")
    exit(1)


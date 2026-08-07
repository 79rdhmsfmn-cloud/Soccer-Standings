import json
import requests
from bs4 import BeautifulSoup

URL = "https://www.ss-nb.org/en/sports/soccer/results/827?div=sw-a/aa"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

try:
    response = requests.get(URL, headers=headers, timeout=15)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    standings_data = []

    # Find the "League" h3 heading (NOT "League Playoffs")
    league_heading = None
    for h3 in soup.find_all("h3"):
        if h3.text.strip() == "League":
            league_heading = h3
            break

    if not league_heading:
        print("Could not find 'League' heading on the page!")
        exit(1)

    # Get the table right after the "League" heading
    standings_table = league_heading.find_next("table")
    if not standings_table:
        print("Could not find standings table!")
        exit(1)

    rows = standings_table.find_all("tr")
    for row in rows[1:]:  # Skip header row
        cells = row.find_all("td")
        if len(cells) >= 7:
            record = {
                "rank": cells[0].text.strip(),
                "team": cells[1].text.strip().replace("Soccer (CH)", "").strip(),
                "gp": cells[2].text.strip(),
                "w": cells[3].text.strip(),
                "l": cells[4].text.strip(),
                "t": cells[5].text.strip(),
                "points": cells[6].text.strip(),
            }
            standings_data.append(record)

    if not standings_data:
        print("No standings data found!")
        exit(1)

    with open("standings.json", "w", encoding="utf-8") as file:
        json.dump(standings_data, file, indent=4)

    print(f"Successfully updated standings.json with {len(standings_data)} teams:")
    for team in standings_data:
        print(f"  #{team['rank']} {team['team']} - {team['points']} pts")

except Exception as e:
    print(f"Error occurred: {e}")
    exit(1)

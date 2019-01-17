"""
Scrapes starting grid data
"""

from bs4 import BeautifulSoup
from util import countries
from util import mongo
from util import scraper

root = "https://www.formula1.com"

# Get links of all races
html = scraper.BeautifulSoupedHtml("https://www.formula1.com/en/results.html/2018/races.html")
links = html.find_all(attrs={"data-name": "meetingKey"})[1:]
links = list(map(lambda x : root + x['href'], links))
links = list(map(lambda x : x.replace('race-result', 'starting-grid'), links))

# Initialize mongodb database
c_races = mongo.F1_db("starting_grid")
# Delete all existing entries
c_races.flush()

for ii, link in enumerate(links):
  html = scraper.BeautifulSoupedHtml(link)
  country = html.select("a.resultsarchive-filter-item-link.FilterTrigger.selected")[-1].text.strip()
  table = html.select("table.resultsarchive-table")[0]
  rows = table.select("tr")[1:]

  rows = list(map(lambda x : x.select("td")[1:], rows))
  rows = list(map(lambda x : list(map(lambda y : y.text, x)), rows))

  for i in range(len(rows)):
    y = rows[i]
    rows[i] = (y[:2] + y[2].split('\n')[1:-1] + y[3:])[:-1]

  # Create objects
  objs = []
  for entry in rows:
    obj = {}
    obj['country'] = country
    obj['country_code'] = countries.lookup("name", country, "code")
    obj['position'] = entry[0]
    obj['number'] = entry[1]
    obj['driver_first'] = entry[2]
    obj['driver_last'] = entry[3]
    obj['driver_code'] = entry[4]
    obj['car'] = entry[5]
    obj['time'] = entry[6]

    objs.append(obj)

  c_races.update_many(objs)

  print("[" + str(ii+1) + "/21] Processed " + country + " results.")
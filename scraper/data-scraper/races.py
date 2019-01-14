"""
Scrapes race (grand prixes) data
"""

from bs4 import BeautifulSoup
from util import countries
from util import mongo
from util import scraper

root = "https://www.formula1.com"
html = scraper.BeautifulSoupedHtml("https://www.formula1.com/en/racing/2018.html")

# collect links
links = html.select("a.race-teaser-link.column.column-4")
links = list(map(lambda x : root + x['href'], links))

races = []

# scrape each link
for i, link in enumerate(links):
    html = scraper.BeautifulSoupedHtml(link)

    race = {}

    race['name'] = html.select("p.f1--s.padding-xs")[0].text
    race['track'] = html.select("p.f1-uppercase.misc--tag.no-margin")[0].text

    race['country'] = html.select("title")[0].text
    race['country_ese'] = countries.lookup("name", race['country'], "ese")
    race['country_code'] = countries.lookup("name", race['country'], "code")

    podium = html.select("strong.f1-podium--surname")
    podium = list(map(lambda x : x.text, podium))
    race['p1'] = podium[0]
    race['p2'] = podium[1]
    race['p3'] = podium[2]

    dates = html.select("p.f1-timetable--date")
    dates = list(map(lambda x : x.select("span"), dates))
    dates = list(map(lambda x : " ".join([x[0].text, x[1].text]), dates))
    race['date_race'] = dates[0]
    race['date_qualifying'] = dates[1]
    race['date_fp1'] = dates[2]
    race['date_fp2'] = dates[3]
    race['date_fp3'] = dates[4]

    race['start_date'] = dates[4]
    race['end_date'] = dates[0]

    print("[" + str(i+1) + "/21] Processed " + race['country'] + " grand prix.")

    races.append(race)

c_races = mongo.F1_db("races")
c_races.update_many(races, "country")
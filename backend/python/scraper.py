from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
import numpy as np


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None.
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None

    except RequestException as e:
        log_error('Error during requests to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns True if the response seems to be HTML, False otherwise.
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


def log_error(e):
    """
    It is always a good idea to log errors. 
    This function just prints them, but you can
    make it do anything.
    """
    print(e)


def extract_table(url):

    retval = []

    raw_html = simple_get(url)
    html = BeautifulSoup(raw_html, 'html.parser')

    table = html.find("table", class_="resultsarchive-table")
    rows = table.find_all("tr")

    header = rows[0]
    rows = rows[1:]

    for row in rows:
        cells = row.find_all("td")
        cells = cells[1:-1]

        entry = []

        for cell in cells:
            entry.append(cell.text.strip('\n').strip().split('\n'))

        entry_f = []
        for a in entry:
            entry_f += a

        retval.append(np.array(entry_f).flatten())

    return np.array(retval)


"""

t_teams = extract_table('https://www.formula1.com/en/results.html/2018/team.html')
t_drivers = extract_table('https://www.formula1.com/en/results.html/2018/drivers.html')
t_races = extract_table('https://www.formula1.com/en/results.html/2018/races.html')
# omit unnecessary information
for i in range(len(t_races)):
	t_races[i] = t_races[i][:2]


print("\nTEAMS:")

for i in t_teams:
	print(i)

print("\nDRIVERS:")

for i in t_drivers:
	print(i)

print("\nGRAND PRIXES:")

for i in t_races:
	print(i)

"""
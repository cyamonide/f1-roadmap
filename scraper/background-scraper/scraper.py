import os

def getUrl(country):
    return "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/" + country + ".jpg.transform/12col/image.jpg"

def resolveName(country):
    return country.replace(' ', '%20')

def resolveFilename(country):
    return country.replace(' ', '_')

countries = [
    "Australia",
    "Bahrain",
    "China",
    "Azerbaijan",
    "Spain",
    "Monaco",
    "Canada",
    "France",
    "Austria",
    "Great Britain",
    "Germany",
    "Hungary",
    "Belgium",
    "Italy",
    "Singapore",
    "Russia",
    "Japan",
    "USA",
    "Mexico",
    "Brazil",
    "Abu Dhabi"
]

for country in countries:
    cmd = "wget " + getUrl(resolveName(country)) + " -O " + resolveFilename(country) + ".jpg"
    os.system(cmd)


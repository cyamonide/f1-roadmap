import numpy as np
import scraper
import sql_management

# Get list of GP countries
races = scraper.extract_table(
    "https://www.formula1.com/en/results.html/2018/races.html")
f_races = races[:, 0]
f_races = np.array(
    list(map(lambda x: x.replace(' ', '-').lower() + ".html", f_races)))

# Tail of URL ends in xxx/country.html, where xxx is
# 	enumeration. Australia starts at 979
base_enum = 979

# Construct actual URLs with enumeration and race name
links = []
for i in range(len(f_races)):
    link = "https://www.formula1.com/en/results.html/2018/races/"
    link += str(base_enum + i) + "/"
    link += f_races[i]
    links.append(link)

# # Extract and concat all GP tables
# t_gps = np.zeros([1, 1])

# for i, link in enumerate(links):
#     print("Extracting " + link + "...")

#     this_table = scraper.extract_table(link)
#     this_table = np.array(
#         list(map(lambda x: np.concatenate((np.array([races[i, 0], races[i, 1]]), x)),
#                  this_table)))

#     if not t_gps[0][0]:
#         t_gps = this_table
#     else:
#         t_gps = np.concatenate((t_gps, this_table), axis=0)

# np.save('t_gps', t_gps)
t_gps = np.load('t_gps.npy')

for entry in t_gps:
	sql_management.add_table_entry("grand_prixes", entry)

sql_management.mydb.commit()
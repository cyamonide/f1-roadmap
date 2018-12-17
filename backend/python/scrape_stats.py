import numpy as np
import scraper
import sql_management

# Initialize tables (no flush)
sql_management.initialize_tables(sql_management.f1_tables)

# Check if table already has entries
sql_management.mycursor.execute("SELECT COUNT(*) FROM 2018_stats")
r = sql_management.mycursor.fetchall()
if r[0][0] != 0:
	print("2018_stats not empty. Not updating values!")
	exit()

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

# Extract and concat all GP tables
t_2018_stats = np.zeros([1, 1])

for i, link in enumerate(links):
    print("Extracting " + link + "...")

    this_table = scraper.extract_table(link)
    this_table = np.array(
        list(map(lambda x: np.concatenate((np.array([races[i, 0], races[i, 1]]), x)),
                 this_table)))

    if not t_2018_stats[0][0]:
        t_2018_stats = this_table
    else:
        t_2018_stats = np.concatenate((t_2018_stats, this_table), axis=0)

# np.save('t_2018_stats', t_2018_stats)
# t_2018_stats = np.load('t_2018_stats.npy')

# Update table
for entry in t_2018_stats:
    sql_management.add_table_entry("2018_stats", entry)

# Commit changes to MySQL
sql_management.mydb.commit()

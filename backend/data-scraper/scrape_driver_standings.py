#! /usr/bin/python

import numpy as np
import scraper
import sql_management

# Initialize tables (no flush)
sql_management.initialize_tables(sql_management.f1_tables)

# Check if table already has entries
sql_management.mycursor.execute("SELECT COUNT(*) FROM 2018_driver_standings")
r = sql_management.mycursor.fetchall()
if r[0][0] != 0:
	print("2018_driver_standings not empty. Exiting!")
	exit()

# Check if 2018_stats initialized
sql_management.mycursor.execute("SELECT COUNT(*) FROM 2018_stats")
r = sql_management.mycursor.fetchall()
if r[0][0] == 0:
	print("2018_stats empty. Please run scrape_stats.py first. Exiting!")
	exit()

# Fetch driver numbers
sql_management.mycursor.execute("SELECT DISTINCT driver_handle, driver_number FROM 2018_stats")
r = sql_management.mycursor.fetchall()
driver_numbers = {}
for pair in r:
	driver_numbers[pair[0]] = pair[1]

# Extract driver standings table
link = "https://www.formula1.com/en/results.html/2018/drivers.html"
print("Extracting " + link + "...")
driver_standings = scraper.extract_table(link)

# Insert driver numbers into extracted table
driver_standings = np.array(list(map(lambda x : np.insert(x, 1, driver_numbers[x[3]]), driver_standings)))

# Update table
for entry in driver_standings:
    sql_management.add_table_entry("2018_driver_standings", entry)

# Commit changes to MySQL
sql_management.mydb.commit()

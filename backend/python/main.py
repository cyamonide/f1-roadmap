import mysql.connector


def create_table(table_name, table_headers):
    """Creates a new SQL table, initialized based on given parameters

    Args:
        table_name (str): The name of the table.
        table_headers (dict): The names of the columns mapped to their
            SQL types plus any additional arguments such as
            "AUTO_INCREMENT" or "PRIMARY KEY".

    Returns:
        True if successful, False otherwise.

    """

    # Parse command
    cmd = "CREATE TABLE " + table_name + "("
    for heading in table_headers:
        cmd += heading + " " + table_headers[heading] + ", "
    cmd = cmd[:-2] + ")"

    # Execute command
    try:
        mycursor.execute(cmd)
        print("Table " + table_name + " created.")
        return True
    except mysql.connector.errors.ProgrammingError:
        print("Table " + table_name +
              " already exists, or skipped due to an error.")
        return False


# Connect to MySQL database f1_2018
mydb = mysql.connector.connect(
    host="localhost",
    user="danny",
    password="welldonebaku",
    database="f1_2018")

# Initialize cursor
mycursor = mydb.cursor(buffered=True)

# Table headers for grand prixes
grand_prixes_table_headers = {
    "country": "VARCHAR(255)",
    "weekend": "DATE",
    "event_id": "INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY"
}

# Table headers for driver standings
driver_standings_table_headers = {
    "driver_id": "INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY",
    "position": "INT UNSIGNED",
    "first_name": "VARCHAR(255)",
    "last_name": "VARCHAR(255)",
    "nationality": "CHAR(3)",
    "car": "VARCHAR(255)",
    "points": "INT UNSIGNED"
}

# Table headers for driver stats
driver_stats_table_headers = {
    "event_id": "INT UNSIGNED",
    "event_country": "VARCHAR(255)",
    "driver_id": "INT UNSIGNED",
    "first_name": "VARCHAR(255)",
    "last_name": "VARCHAR(255)",
    "car": "VARCHAR(255)",
    "position": "INT UNSIGNED",
    "points": "INT UNSIGNED",
    "PRIMARY": "KEY(event_id, driver_id)"
}

# Table headers for constructor standings
constructor_standings_table_headers = {
    "team_id": "INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY",
    "position": "INT UNSIGNED",
    "team_name": "VARCHAR(255)",
    "points": "INT UNSIGNED"
}

# Table headers for constructor stats
constructor_stats_table_headers = {
    "event_id": "INT UNSIGNED",
    "event_country": "VARCHAR(255)",
    "team_id": "INT UNSIGNED",
    "team_name": "VARCHAR(255)",
    "car": "VARCHAR(255)",
    "position": "INT UNSIGNED",
    "points": "INT UNSIGNED",
    "PRIMARY": "KEY(event_id, team_id)"
}

tables = {
    "grand_prixes": grand_prixes_table_headers,
    "driver_standings": driver_standings_table_headers,
    "driver_stats": driver_stats_table_headers,
    "constructor_standings": constructor_standings_table_headers,
    "constructor_stats": constructor_stats_table_headers
}

# Initialize all tables
for table_name in tables:
    create_table(table_name, tables[table_name])


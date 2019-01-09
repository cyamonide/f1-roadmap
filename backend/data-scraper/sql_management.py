import mysql.connector
import re


def create_table(table_name, table_headers):
    """Creates a new SQL table, initialized based on given parameters.

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


def initialize_tables(tables, flush=False):
    """Initializes all tables based on table headers in 
    provided tables.

    Args:
        tables (dict): dictionary of table name mapping to a dict
            of table header names and their corresponding type.
        flush (bool): True if tables are to be deleted and 
            recreated, False otherwise.

    """

    # Initialize all tables
    for table_name in tables:
        if flush:
            try:
                mycursor.execute("drop table " + table_name)
            except mysql.connector.errors.ProgrammingError:
                pass
        create_table(table_name, tables[table_name])


def add_table_entry(table_name, values):
    """Adds an entry to the MySQL table named table_name, given 
    appropriate values for the table's headers.

    Args:
        table_name (str): name of table in which to add entries.
        values (list): list of values to insert into table.

    Returns:
        True if successful, False otherwise.

    """

    try:
        headers = f1_tables[table_name]
    except KeyError:
        print(table_name + " is not a valid table in database f1_2018.")
        print("\t Unable to add entry.")
        return False

    cmd = "INSERT INTO " + table_name + " VALUES ("

    # Concat values into cmd
    for i, header in enumerate(headers):
        val = values[i]
        val_type = headers[header]

        # Special formatting cases
        if re.match('^INT', val_type):
            # Handle integer formatting
            if val.isdigit():
                cmd += val + ", "
            else:
                cmd += "NULL, "
        elif val_type == 'DATE':
            # Handle date formatting
            year = val[-4:]
            month = str(month_text_enum[val[-8:-5]])
            day = val[:-9]
            sql_date = '-'.join([year, month, day])
            cmd += '"' + sql_date + '", '
        else:
            cmd += "'" + val + "', "

    cmd = cmd[:-2] + ")"

    mycursor.execute(cmd)


# Map of text months to enumeration
month_text_enum = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
}

# Connect to MySQL database f1_2018
mydb = mysql.connector.connect(
    host="localhost",
    user="danny",
    password="welldonebaku",
    database="f1")

# Initialize cursor
mycursor = mydb.cursor(buffered=True)

# Table headers for grand prixes
table_headers_2018_stats = {
    "country": "VARCHAR(255)",
    "weekend": "DATE",
    "position": "INT UNSIGNED",
    "driver_number": "INT UNSIGNED",
    "driver_first_name": "VARCHAR(255)",
    "driver_last_name": "VARCHAR(255)",
    "driver_handle": "CHAR(3)",
    "car": "VARCHAR(255)",
    "laps": "INT UNSIGNED",
    "time_retired": "VARCHAR(255)",
    "points": "INT UNSIGNED"
}

table_headers_2018_driver_standings = {
    "position": "INT UNSIGNED",
    "driver_number": "INT UNSIGNED",
    "driver_first_name": "VARCHAR(255)",
    "driver_last_name": "VARCHAR(255)",
    "driver_handle": "CHAR(3)",
    "home_country": "CHAR(3)",
    "car": "VARCHAR(255)",
    "points": "INT UNSIGNED"
}

table_headers_2018_constructor_standings = {
    "position": "INT UNSIGNED",
    "car": "VARCHAR(255)",
    "points": "INT UNSIGNED"
}

f1_tables = {
    "2018_stats": table_headers_2018_stats,
    "2018_driver_standings": table_headers_2018_driver_standings,
    "2018_constructor_standings": table_headers_2018_constructor_standings
}
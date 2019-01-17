data = [
    { "name": "Australia", "ese": "Australian", "code": "AUS" },
    { "name": "Bahrain", "ese": "Bahraini", "code": "BHR" }, 
    { "name": "China", "ese": "Chinese", "code": "CHN" },
    { "name": "Azerbaijan", "ese": "Azerbaijani", "code": "AZE" },
    { "name": "Spain", "ese": "Spanish", "code": "ESP" },
    { "name": "Monaco", "ese": "Monacan", "code": "MCO" },
    { "name": "Canada", "ese": "Canadian", "code": "CAN" },
    { "name": "France", "ese": "French", "code": "FRA" },
    { "name": "Austria", "ese": "Austrian", "code": "AUT" },
    { "name": "Great Britain", "ese": "British", "code": "GBR" },
    { "name": "Germany", "ese": "German", "code": "DEU" },
    { "name": "Hungary", "ese": "Hungarian", "code": "HUN" },
    { "name": "Belgium", "ese": "Belgian", "code": "BEL" },
    { "name": "Italy", "ese": "Italian", "code": "ITA" },
    { "name": "Singapore", "ese": "Singapore", "code": "SGP" },
    { "name": "Russia", "ese": "Russian", "code": "RUS" },
    { "name": "Japan", "ese": "Japanese", "code": "JPN" },
    { "name": "United States", "ese": "American", "code": "USA" },
    { "name": "Mexico", "ese": "Mexican", "code": "MEX" },
    { "name": "Brazil", "ese": "Brazilian", "code": "BRA" },
    { "name": "Abu Dhabi", "ese": "Abu Dhabi", "code": "UAE" }
]

def lookup(input_field, input_val, output_field):
    """
        input_field is any of "name", "ese", or "code"
    """
    l = list(filter(lambda x : x[input_field] == input_val, data))
    if len(l) != 0:
        return l[0][output_field]
    print("No entry found for " + input_field + ": " + input_val)
    return ""

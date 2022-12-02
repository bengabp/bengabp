import pickle
from pprint import pprint
from zoneinfo import ZoneInfo
from github3 import login
from datetime import datetime
import time

CODES_AND_MONTHS = {
    1:"Jan",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12:"Dec"
}

gh = login("bengab-coder","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")

# for repository in gh.repositories("all"):
#     print(repository)
#     print(dir(repository))


    
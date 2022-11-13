import json

with open("github_info.json","r") as gf:
    g = json.load(gf)
    print(g)
from mysite import settings
from django.templatetags.static import static
import json
from pprint import pprint


def get_repo_informations():
    user = settings.github.get_user("bengab-coder")
    repos = []
    print("Updating github repo informations ....")

    for repo in user.get_repos():
        name = repo.name
        description = repo.description
        github_url = repo.clone_url
        langs = repo.get_languages().keys()
        
        repos.append({
            'name':name,
            'description':description,
            'github_url':github_url,
            'langs':list(langs),
        })
    
    h = None
    with open(settings.GITHUB_INFO_FILE,"r") as gf:
        g = json.load(gf)
        g["repos"] = repos
        h = g
    if h:
        with open(settings.GITHUB_INFO_FILE,"w") as updated:
            pprint(h)
            json.dump(h,updated,indent=4)

    print("Done ...")
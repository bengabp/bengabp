from datetime import datetime
from mysite import settings
from django.templatetags.static import static
import json
from collections import Counter


def get_repo_informations():
    repos = []

    total_lang_count = 0
    user_commit_history = {}
    language_information = {}
    languages = []
    unique_languages = Counter()


    for repo in settings.github.repositories():
        name = repo.name
        description = repo.description
        github_url = repo.html_url
        langs = repo.languages()

        repo_language_stats = {}
        rl = []
        
        for language,_ in langs:
            languages.append(language)
            repo_language_stats
            rl.append(language)

        repo_language_stats["langs"] = rl

        if not repo.private:
            repos.append({
                'name':name,
                'description':description,
                'github_url':github_url,
                'langs':repo_language_stats,
            })

        commits = repo.commits()

        for commit in commits:
            commit_dict = commit.as_dict()
            # html_url = commit_dict.get("html_url")
            commit_commits = commit_dict.get("commit")
            author = commit_commits.get("author")
            date = author.get("date")
            
            yymmdd,_ = date.split("T")
            yy,mm,_ = yymmdd.split("-")

            date = datetime(year=int(yy),month=int(mm),day=1)
            date_string = date.strftime("%b %Y")

            if not user_commit_history.get(date.timestamp()):
                user_commit_history[date.timestamp()] = {"date":date_string,"value":0}
            user_commit_history[date.timestamp()]['value'] += 1
        
        commit_history = sorted(user_commit_history.items())
        commit_history = list(map(lambda ch:{"timestamp":ch[0],"date":ch[1]['date'],"value":ch[1]["value"]},commit_history))

    unique_languages = Counter(languages)
    language_information["languages"] = dict(unique_languages)
    language_information["total_counts"] = unique_languages.total()

    with open(settings.GITHUB_INFO_FILE,"r") as gf:
        g = json.load(gf)
        g["repos"] = repos
        g["language_information"] = language_information
        g["commits_history"] = commit_history[-12:]
        
    if g:
        with open(settings.GITHUB_INFO_FILE,"w") as updated:
            json.dump(g,updated,indent=4)

    print("Done Updating..")
import requests

def get_user_profile(username):
    url = f"https://api.github.com/users/{username}"

    response = requests.get(url)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "name": data.get("name"),
        "repos": data.get("public_repos"),
        "followers": data.get("followers"),
        "following": data.get("following")
    }
def get_repo_statistics(username):

    url = f"https://api.github.com/users/{username}/repos"

    response = requests.get(url)

    if response.status_code != 200:
        return None

    repos = response.json()

    total_stars = 0
    total_forks = 0

    languages = {}

    for repo in repos:

        total_stars += repo["stargazers_count"]

        total_forks += repo["forks_count"]

        lang = repo["language"]

        if lang:

            if lang not in languages:
                languages[lang] = 0

            languages[lang] += 1

    return {
        "stars": total_stars,
        "forks": total_forks,
        "languages": languages
    }
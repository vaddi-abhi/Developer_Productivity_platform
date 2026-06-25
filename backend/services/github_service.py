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
        "following": data.get("following"),
        "avatar": data.get("avatar_url"),
        "github_url": data.get("html_url")
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

    most_starred_repo = None
    max_stars = -1

    for repo in repos:

        stars = repo["stargazers_count"]
        forks = repo["forks_count"]

        total_stars += stars
        total_forks += forks

        lang = repo["language"]

        if lang:
            languages[lang] = languages.get(lang, 0) + 1

        if stars > max_stars:
            max_stars = stars
            most_starred_repo = repo["name"]

    top_language = None

    if languages:
        top_language = max(
            languages,
            key=languages.get
        )

    language_count = len(languages)

    return {
        "repository_count": len(repos),
        "stars": total_stars,
        "forks": total_forks,
        "languages": languages,
        "language_count": language_count,
        "top_language": top_language,
        "most_starred_repo": most_starred_repo
    }

def get_repositories(username):

        url = f"https://api.github.com/users/{username}/repos"

        response = requests.get(url)

        if response.status_code != 200:
            return None

        repos = response.json()

        repository_list = []

        for repo in repos:

            repository_list.append({

                "name": repo.get("name"),

                "description": repo.get("description"),

                "language": repo.get("language"),

                "stars": repo.get("stargazers_count"),

                "forks": repo.get("forks_count"),

                "updated_at": repo.get("updated_at"),

                "url": repo.get("html_url")
            })

        return repository_list
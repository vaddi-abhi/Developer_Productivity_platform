from score_calculator import calculate_score
from fastapi import FastAPI
from github_service import (
    get_user_profile,
    get_repo_statistics
)
app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "DevInsight Running"
    }

@app.get("/repos/{username}")
def repo_stats(username: str):

    stats = get_repo_statistics(username)

    if stats is None:
        return {
            "error": "User not found"
        }
  @app.get("/dashboard/{username}")
def dashboard(username: str):

    profile = get_user_profile(username)

    repo_stats = get_repo_statistics(username)

    if (
        profile is None
        or repo_stats is None
    ):
        return {
            "error": "User not found"
        }

    score = calculate_score(
        profile["repos"],
        repo_stats["stars"],
        profile["followers"]
    )

    return {
        "profile": profile,
        "repository_stats": repo_stats,
        "developer_score": score
    }

    return stats
def github_profile(username: str):

    profile = get_user_profile(username)

    if profile is None:
        return {
            "error": "User not found"
        }

    return profile
from fastapi import FastAPI
from sqlalchemy import desc

from database import engine, SessionLocal
from models import Base, AnalyticsHistory

from github_service import (
    get_user_profile,
    get_repo_statistics
)

from score_calculator import calculate_score


app = FastAPI()

# Create tables automatically
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "DevInsight Running"
    }


@app.get("/github/{username}")
def github_profile(username: str):

    profile = get_user_profile(username)

    if profile is None:
        return {
            "error": "User not found"
        }

    return profile


@app.get("/repos/{username}")
def repo_stats(username: str):

    stats = get_repo_statistics(username)

    if stats is None:
        return {
            "error": "User not found"
        }

    return stats


@app.get("/dashboard/{username}")
def dashboard(username: str):

    profile = get_user_profile(username)

    repo_stats = get_repo_statistics(username)

    if profile is None or repo_stats is None:
        return {
            "error": "User not found"
        }

    score = calculate_score(
        profile["repos"],
        repo_stats["stars"],
        profile["followers"]
    )

    db = SessionLocal()

    record = AnalyticsHistory(
        username=username,
        score=score,
        repo_count=profile["repos"],
        stars=repo_stats["stars"],
        followers=profile["followers"]
    )

    db.add(record)
    db.commit()
    db.close()

    return {
        "profile": profile,
        "repository_stats": repo_stats,
        "developer_score": score
    }


@app.get("/history/{username}")
def history(username: str):

    db = SessionLocal()

    records = (
        db.query(AnalyticsHistory)
        .filter(
            AnalyticsHistory.username == username
        )
        .order_by(
            desc(AnalyticsHistory.created_at)
        )
        .all()
    )

    db.close()

    result = []

    for record in records:

        result.append({
            "id": record.id,
            "score": record.score,
            "repo_count": record.repo_count,
            "stars": record.stars,
            "followers": record.followers,
            "created_at": record.created_at
        })

    return result


@app.get("/summary/{username}")
def summary(username: str):

    profile = get_user_profile(username)

    repo_stats = get_repo_statistics(username)

    if profile is None or repo_stats is None:
        return {
            "error": "User not found"
        }

    score = calculate_score(
        profile["repos"],
        repo_stats["stars"],
        profile["followers"]
    )

    db = SessionLocal()

    snapshot_count = (
        db.query(AnalyticsHistory)
        .filter(
            AnalyticsHistory.username == username
        )
        .count()
    )

    db.close()

    return {
        "developer_score": score,
        "repositories": profile["repos"],
        "followers": profile["followers"],
        "stars": repo_stats["stars"],
        "forks": repo_stats["forks"],
        "top_language": repo_stats["top_language"],
        "most_starred_repo": repo_stats["most_starred_repo"],
        "snapshots_stored": snapshot_count
    }
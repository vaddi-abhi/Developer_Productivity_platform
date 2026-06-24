from fastapi import APIRouter
from sqlalchemy import desc


from database.connection import SessionLocal

from models.analytics import AnalyticsHistory

from services.github_service import (
    get_user_profile,
    get_repo_statistics
)

from services.score_service import calculate_score

from services.analytics_service import build_dashboard

router = APIRouter()


@router.get("/")
def home():
    return {"message": "DevInsight Running"}


@router.get("/github/{username}")
def github_profile(username: str):

    profile = get_user_profile(username)

    if profile is None:
        return {"error": "User not found"}

    return profile


@router.get("/repos/{username}")
def repo_stats(username: str):

    stats = get_repo_statistics(username)

    if stats is None:
        return {"error": "User not found"}

    return stats


@router.get("/dashboard/{username}")
def dashboard(username: str):

    profile = get_user_profile(username)
    repo_stats = get_repo_statistics(username)

    if profile is None or repo_stats is None:
        return {"error": "User not found"}

    score = calculate_score(
        profile["repos"],
        repo_stats["stars"],
        profile["followers"],
        repo_stats["language_count"]
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


@router.get("/history/{username}")
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


@router.get("/summary/{username}")
def summary(username: str):

    profile = get_user_profile(username)
    repo_stats = get_repo_statistics(username)

    if profile is None or repo_stats is None:
        return {"error": "User not found"}

    score = calculate_score(
        profile["repos"],
        repo_stats["stars"],
        profile["followers"],
        repo_stats["language_count"]
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


@router.get("/growth/{username}")
def growth(username: str):

    db = SessionLocal()

    records = (
        db.query(AnalyticsHistory)
        .filter(
            AnalyticsHistory.username == username
        )
        .order_by(
            AnalyticsHistory.created_at
        )
        .all()
    )

    db.close()

    if len(records) < 2:
        return {
            "message": "Not enough history available"
        }

    first_score = records[0].score
    latest_score = records[-1].score

    if first_score == 0:
        growth_percent = 0
    else:
        growth_percent = (
            (latest_score - first_score)
            / first_score
        ) * 100

    return {
        "first_score": first_score,
        "latest_score": latest_score,
        "growth_percent": round(growth_percent, 2),
        "snapshots": len(records)
    }


@router.get("/score-breakdown/{username}")
def score_breakdown(username: str):

    profile = get_user_profile(username)
    repo_stats = get_repo_statistics(username)

    if profile is None or repo_stats is None:
        return {"error": "User not found"}

    repo_score = min(profile["repos"] * 2, 40)

    star_score = min(repo_stats["stars"], 20)

    follower_score = min(
        profile["followers"] // 5,
        15
    )

    diversity_score = min(
        repo_stats["language_count"] * 3,
        15
    )

    total_score = (
        repo_score
        + star_score
        + follower_score
        + diversity_score
    )

    return {
        "repository_score": repo_score,
        "star_score": star_score,
        "follower_score": follower_score,
        "diversity_score": diversity_score,
        "total_score": total_score
    }


@router.get("/analytics")
def analytics(
    github: str,
    cf: str = ""
):

    dashboard_data = build_dashboard(
    github,
    cf
)

    if dashboard_data is None:
        return {
            "error": "User not found"
        }

    return dashboard_data
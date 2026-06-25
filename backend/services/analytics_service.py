from services.github_service import (
    get_user_profile,
    get_repo_statistics
)

from services.leetcode_service import (
    get_leetcode_profile
)

from services.codeforces_service import (
    get_codeforces_profile
)

from services.score_service import (
    calculate_score
)

from database.connection import SessionLocal
from models.analytics import AnalyticsHistory


def build_dashboard(
    github_username,
    cf_handle="",
    lc_handle=""

):

    profile = get_user_profile(
        github_username
    )

    repo_stats = get_repo_statistics(
        github_username
    )

    cf_profile = None

    if cf_handle:
        cf_profile = get_codeforces_profile(
            cf_handle
        )
    
    lc_profile = None

    if lc_handle:
        lc_profile = get_leetcode_profile(
        lc_handle
    )

    if profile is None or repo_stats is None:
        return None

    score = calculate_score(
        profile["repos"],
        repo_stats["stars"],
        profile["followers"],
        repo_stats["language_count"]
    )

    cf_bonus = 0

    if cf_profile and cf_profile.get("rating"):
        cf_bonus = min(
            cf_profile["rating"] // 100,
            40
        )

    lc_bonus = 0

    if lc_profile:

        solved = lc_profile["total_solved"]

        if solved >= 1000:
            lc_bonus += 20
        elif solved >= 500:
            lc_bonus += 15
        elif solved >= 200:
            lc_bonus += 10
        elif solved >= 50:
            lc_bonus += 5

        rating = lc_profile["contest_rating"]

        if rating:
            if rating >= 2100:
                lc_bonus += 10
            elif rating >= 1800:
                lc_bonus += 7
            elif rating >= 1500:
                lc_bonus += 5

    score = min(
        score + cf_bonus + lc_bonus,
        100
    )

    db = SessionLocal()

    records = (
        db.query(AnalyticsHistory)
        .filter(
            AnalyticsHistory.username == github_username
        )
        .order_by(
            AnalyticsHistory.created_at
        )
        .all()
    )

    snapshot_count = len(records)

    growth_percent = 0

    if len(records) >= 2:

        first_score = records[0].score
        latest_score = records[-1].score

        if first_score != 0:
            growth_percent = round(
                (
                    (latest_score - first_score)
                    / first_score
                ) * 100,
                2
            )

    db.close()

    repo_score = min(
        profile["repos"] * 2,
        40
    )

    star_score = min(
        repo_stats["stars"],
        20
    )

    follower_score = min(
        profile["followers"] // 5,
        15
    )

    diversity_score = min(
        repo_stats["language_count"] * 3,
        15
    )

    return {

        "summary": {
            "developer_score": score,
            "repositories": profile["repos"],
            "followers": profile["followers"],
            "stars": repo_stats["stars"],
            "forks": repo_stats["forks"],
            "top_language": repo_stats["top_language"],
            "most_starred_repo":
                repo_stats["most_starred_repo"],
            "avatar": profile["avatar"],
            "github_url": profile["github_url"]
        },

        "growth": {
            "growth_percent":
                growth_percent,
            "snapshots":
                snapshot_count
        },

        "breakdown": {
            "repository_score":
                repo_score,
            "star_score":
                star_score,
            "follower_score":
                follower_score,
            "diversity_score":
                diversity_score
        },

        "history": [
            {
                "score": r.score,
                "created_at":
                    str(r.created_at)
            }
            for r in records
        ],

        "codeforces": cf_profile,
        "leetcode": lc_profile
    } 

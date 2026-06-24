import requests


def get_codeforces_profile(handle):

    url = (
        "https://codeforces.com/api/user.info"
        f"?handles={handle}"
    )

    try:

        response = requests.get(
            url,
            timeout=10
        )

        data = response.json()

        if data["status"] != "OK":
            return None

        user = data["result"][0]

        return {
            "handle": user.get("handle"),
            "rating": user.get("rating", 0),
            "max_rating": user.get("maxRating", 0),
            "rank": user.get("rank", "unrated"),
            "max_rank": user.get("maxRank", "unrated"),
            "contribution": user.get("contribution", 0),
            "friend_of_count":
                user.get("friendOfCount", 0)
        }

    except Exception:
        return None
import requests


def get_leetcode_profile(username):

    url = "https://leetcode-stats-api.herokuapp.com/" + username

    try:

        response = requests.get(
            url,
            timeout=10
        )

        if response.status_code != 200:
            return None

        data = response.json()

        if data.get("status") == "error":
            return None

        return {
            "total_solved": data.get("totalSolved", 0),
            "easy_solved": data.get("easySolved", 0),
            "medium_solved": data.get("mediumSolved", 0),
            "hard_solved": data.get("hardSolved", 0),
            "ranking": data.get("ranking", 0)
        }

    except Exception:
        return None
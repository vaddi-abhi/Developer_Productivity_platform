import requests

LEETCODE_GRAPHQL = "https://leetcode.com/graphql"


def get_leetcode_profile(username: str):

    query = """
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {

        username

        profile {
          ranking
          reputation
          userAvatar
        }

        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }

      }

      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
      }
    }
    """

    variables = {
        "username": username
    }

    try:

        response = requests.post(
            LEETCODE_GRAPHQL,
            json={
                "query": query,
                "variables": variables
            },
            timeout=10
        )

        if response.status_code != 200:
            return None

        data = response.json()["data"]

        if data["matchedUser"] is None:
            return None

        stats = data["matchedUser"]["submitStats"]["acSubmissionNum"]

        solved = {
            item["difficulty"]: item["count"]
            for item in stats
        }

        contest = data.get("userContestRanking")

        return {

            "username":
                data["matchedUser"]["username"],

            "avatar":
                data["matchedUser"]["profile"]["userAvatar"],

            "ranking":
                data["matchedUser"]["profile"]["ranking"],

            "reputation":
                data["matchedUser"]["profile"]["reputation"],

            "total_solved":
                solved.get("All", 0),

            "easy":
                solved.get("Easy", 0),

            "medium":
                solved.get("Medium", 0),

            "hard":
                solved.get("Hard", 0),

            "contest_rating":
                contest["rating"] if contest else None,

            "contest_rank":
                contest["globalRanking"] if contest else None,

            "contests":
                contest["attendedContestsCount"] if contest else 0,
        }

    except Exception:
        return None
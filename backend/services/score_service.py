def calculate_score(
    repos,
    stars,
    followers
):
    
    repo_score = min(repos * 2, 40)

    star_score = min(stars, 30)

    follower_score = min(
        followers // 5,
        30
    )

    total_score = (
        repo_score
        + star_score
        + follower_score
    )

    return total_score

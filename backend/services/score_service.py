def calculate_score(
    repos,
    stars,
    followers,
    language_count
):

    # Repository Strength (40)
    repo_score = min(
        repos * 2,
        40
    )

    # Community Impact (20)
    star_score = min(
        stars,
        20
    )

    # Network (15)
    follower_score = min(
        followers // 5,
        15
    )

    # Language Diversity (15)
    diversity_score = min(
        language_count * 3,
        15
    )

    total_score = (
        repo_score
        + star_score
        + follower_score
        + diversity_score
    )

    return min(total_score, 100)
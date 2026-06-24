from fastapi import APIRouter

from services.leetcode_service import (
    get_leetcode_profile
)

router = APIRouter()


@router.get("/leetcode/{username}")
def leetcode(username: str):

    data = get_leetcode_profile(
        username
    )

    if data is None:
        return {
            "error": "User not found"
        }

    return data
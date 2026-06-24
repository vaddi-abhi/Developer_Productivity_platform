from fastapi import APIRouter

from services.codeforces_service import (
    get_codeforces_profile
)

router = APIRouter()


@router.get("/codeforces/{handle}")
def codeforces(handle: str):

    data = get_codeforces_profile(
        handle
    )

    if data is None:
        return {
            "error": "Handle not found"
        }

    return data
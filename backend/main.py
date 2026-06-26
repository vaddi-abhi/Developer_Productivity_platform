from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from database.connection import engine
from models.analytics import Base

from routes.analytics import router
from routes.leetcode import router as leetcode_router
from routes.codeforces import router as codeforces_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://developer-productivity-platform.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router)
app.include_router(leetcode_router)
app.include_router(codeforces_router)
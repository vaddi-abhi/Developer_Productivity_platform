from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from database.connection import engine
from models.analytics import Base

from routes.analytics import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(router)
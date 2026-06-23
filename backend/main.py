from fastapi import FastAPI

from database.connection import engine
from models.analytics import Base

from routes.analytics import router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)
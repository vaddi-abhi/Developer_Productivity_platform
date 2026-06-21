
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


DATABASE_URL = (
    "postgresql://postgres:Abhi%401289@localhost/devinsight"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
from sqlalchemy.orm import sessionmaker

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
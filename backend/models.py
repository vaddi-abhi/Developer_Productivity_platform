from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from sqlalchemy.orm import declarative_base

from datetime import datetime

Base = declarative_base()


class AnalyticsHistory(Base):

    __tablename__ = "analytics_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(String)

    score = Column(Integer)

    repo_count = Column(Integer)

    stars = Column(Integer)

    followers = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
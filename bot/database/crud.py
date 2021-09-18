import datetime
from typing import List

from database.database import SessionLocal
from database.models import User


def add_user(user_id: int) -> User:
    session = SessionLocal()
    db_client = User(
        telegram_id=user_id, date_of_registration=datetime.datetime.now())
    session.add(db_client)
    session.commit()
    session.refresh(db_client)
    return db_client


def get_all_users() -> List[User]:
    session = SessionLocal()
    return session.query(User).all()


def get_user(user_id: int) -> User:
    session = SessionLocal()
    return session.query(User).filter(User.telegram_id == user_id).first()

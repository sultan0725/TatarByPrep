from sqlalchemy import Column, Integer, Date

from database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, unique=True, nullable=False, autoincrement=True)
    telegram_id = Column(Integer, unique=True, nullable=False)
    date_of_registration = Column(Date, nullable=False)

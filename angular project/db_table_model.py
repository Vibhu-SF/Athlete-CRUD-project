from ast import Str
from enum import unique
from db import Base
from sqlalchemy import BigInteger, Integer, Column, String, DateTime, ForeignKey, TIME, Date, JSON, ARRAY
from typing import Optional
from datetime import date, datetime


class athlete_table(Base):

    __tablename__ = "athlete_table"

    athlete_id = Column(Integer, primary_key=True, index=True)
    athleteName = Column(String(30), index=True)
    gender = Column(String(30), index=True)
    sport = Column(String(30), index=True)
    awards = Column(String(200))
    age = Column(Integer)
    dob = Column(String(30))

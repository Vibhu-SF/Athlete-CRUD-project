from pydantic import BaseModel, Field, Json
from datetime import date, datetime
from typing import List
from sqlalchemy import true, Date, JSON, ARRAY



class add_athlete_data(BaseModel):
    # athleteName str
    # dob str
    # age numebr
    # gender str
    # sport string
    # awards int
    athleteName: str
    gender: str
    sport: str
    age: int
    awards: str
    dob: str


class user_data(add_athlete_data):
    athlete_id: int

    class Config:
        orm_mode = True
        arbitary_types_allowed = True

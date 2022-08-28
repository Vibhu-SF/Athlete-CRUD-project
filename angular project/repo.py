from re import S
from sqlite3 import dbapi2
import db_table_model
import schema
from sqlalchemy.orm import Session
from fastapi import HTTPException, status


class users:
    def add_user(db: Session, user_details: schema.add_athlete_data):
        # athleteName str
    # dob Date
    # age numebr
    # gender str
    # sport string
    # awards [String]
        new_user = db_table_model.athlete_table(athleteName=user_details.athleteName,
                                             age=user_details.age, gender=user_details.gender,
                                             sport=user_details.sport, awards= user_details.awards, dob=user_details.dob)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    def all_users(db: Session):
        return db.query(db_table_model.athlete_table).all()

    def user_by_id(db:Session, id:str):
        return db.query(db_table_model.athlete_table).filter(db_table_model.athlete_table.athlete_id == id).first()
    def delete_user(db:Session, id:str):
         db.query(db_table_model.athlete_table).filter(db_table_model.athlete_table.athlete_id == id).delete(synchronize_session=False)
         db.commit()
         return "Done"

    def user_by_contact(db:Session,contact:str):
        return db.query(db_table_model.user_table).filter(db_table_model.user_table.contact == contact).first()

    def user_update(db:Session,id:str,user_data:schema.add_athlete_data):
        db.query(db_table_model.athlete_table).filter(db_table_model.athlete_table.athlete_id == id).update({'athleteName':user_data.athleteName,
        'age':user_data.age,'awards':user_data.awards,'sport':user_data.sport, 'gender': user_data.gender},synchronize_session=False)
        db.commit()
        return "Done"
           
     
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                              
                                                                                                               
        


         


    


from sqlalchemy.orm.session import Session
from fastapi import  Depends,HTTPException
from api._database import SessionLocal,User
from api._auth.auth_handler import signJWT

# Dependency
def get_db():
    db:Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserService:
  def __init__(self,db:Session =Depends(get_db)) :
    self.db = db

  def user_signup(self,user):
    db_user = self.db.query(User).filter(User.email == user.email).first()
     
    if db_user : 
      raise HTTPException(status_code=404,detail="User already exist!")
    else:
     newUser = User(
     fullname = user.fullname,
     email = user.email,
     password =user.password
 )
     self.db.add(newUser)
     self.db.commit()
     self.db.refresh(newUser)

     return signJWT(user.email)
    

  def user_login(self,user):
    db_user = self.db.query(User).filter(User.email == user.email).first()
    if db_user:
        token = signJWT(user.email)
        return {
            "access_token" : token["access_token"],
            "user_id" : db_user.id
        }
    else:
       raise HTTPException(status_code=403, detail="Invalid Credentials!")

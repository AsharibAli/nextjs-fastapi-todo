from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import DeclarativeBase,sessionmaker
from sqlalchemy.engine.base import Engine
import os
load_dotenv() #loading env variables


SQLALCHEMY_DATABASE_URL = os.environ["DATABASE_URL"]

engine : Engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

class Base(DeclarativeBase):
  pass


class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    userid = Column(Integer, index=True,nullable=False)

class User(Base):
    __tablename__="users"
    id =Column(Integer,primary_key=True,index=True)
    fullname = Column(String,index=True)
    email = Column(String,unique=True,nullable=False)
    password= Column(String,nullable=False)


# https://medium.com/@sandyjtech/creating-a-database-using-python-and-sqlalchemy-422b7ba39d7e
# Base.metadata.create_all(engine)  // creating tables in database
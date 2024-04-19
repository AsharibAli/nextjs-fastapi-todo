
from pydantic import BaseModel
from typing import List

class TodoCreate(BaseModel):
    title: str
    description: str
    userid: int
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "title": "Foo",
                    "description": "A very nice Item",
                    "userid": 0,
                }
            ]
        }
    }

class TodoResponse(BaseModel):
    id:int
    title:str
    description:str
    userid:int

class TodoListResponse(BaseModel):
    message: str
    data: List[TodoResponse]

class TodoMessageResponse(BaseModel):
    message:str

class UserSchema(BaseModel):
    fullname: str 
    email: str 
    password: str 

class UserLoginSchema(BaseModel):
    email: str 
    password: str

class UserResponse(BaseModel):
    access_token:str    

  



 

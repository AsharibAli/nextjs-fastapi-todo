from fastapi import FastAPI, Depends
from api._models import TodoCreate,TodoResponse,TodoListResponse,TodoMessageResponse,UserSchema,UserLoginSchema
from api._auth.auth_bearer import JWTBearer
from api._services.todoServices import TodoService
from api._services.userServices import UserService
# from fastapi.middleware.cors import CORSMiddleware


app:FastAPI = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=['*'],
#     allow_credentials=True,
#     allow_methods=['*'],
#     allow_headers=['*'],
# )

todo_service = TodoService
user_service = UserService

# In FastAPI, when you include Depends in the function parameters, it acts as a dependency injection mechanism. The purpose of Depends is to execute the dependency function (TodoService in your case) and pass its return value (TodoService instance) to the corresponding path operation function (create_todos in your case).

# post method
@app.post("/api/todos",dependencies=[Depends(JWTBearer())],response_model=TodoResponse,tags=["todo"])
async def create_todos(todo:TodoCreate,todo_service:TodoService = Depends()):
    response = todo_service.create_todo(todo)
    return  response


# get method    
@app.get("/api/todos/{user_id}",response_model=TodoListResponse,tags=["todo"])
async def get_todos(user_id:int, todo_service:TodoService = Depends()):
   response = todo_service.get_todo(user_id)
   return response
 
# put method
@app.put("/api/todos/{todo_id}",dependencies=[Depends(JWTBearer())],response_model=TodoMessageResponse,tags=["todo"])
async def update_todos(todo_id:int,updated_todo: TodoCreate,todo_service:TodoService = Depends()):
    response = todo_service.update_todo(todo_id,updated_todo)
    return response

   
# delete method
@app.delete("/api/todos/{todo_id}",dependencies=[Depends(JWTBearer())],response_model=TodoMessageResponse, tags=["todo"])
async def delete_todos(todo_id: int,todo_service:TodoService = Depends()):
   response = todo_service.delete_todo(todo_id)
   return response



#  user signup method 
@app.post("/api/user/signup", tags=["user"])
async def create_user(user:UserSchema,user_service:UserService = Depends()):
    response = user_service.user_signup(user)
    return response

    

# user login method
@app.post("/api/user/login", tags=["user"])
async def login_user(user:UserLoginSchema,user_service:UserService = Depends()):
    response = user_service.user_login(user)
    return response






    
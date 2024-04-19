from sqlalchemy.orm.session import Session
from fastapi import Depends,HTTPException
from api._database import SessionLocal,Todo
from api._models import TodoResponse


# Dependency
def get_db():
  db:Session = SessionLocal()
  try:
    yield db
  finally:
    db.close()

class TodoService:
  def __init__(self,db:Session = Depends(get_db)):
    self.db = db
  
  # creating todo
  def create_todo(self,todo_create):
    new_todo = Todo(
        title = todo_create.title,
        description = todo_create.description,
        userid=todo_create.userid 
    )
    self.db.add(new_todo)
    self.db.commit()
    self.db.refresh(new_todo)
    return TodoResponse(**new_todo.__dict__)
    
  # getting todo 
  def get_todo(self,user_id):
    todos = self.db.query(Todo).filter(Todo.userid == user_id).all()
    return {"message" : "todos fetched successfully","data":todos}
  
  # updating todo
  def update_todo(self,todo_id,updated_todo):
    db_todo = self.db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
      raise HTTPException(status_code=404,detail="Todo not found")
    for key , value in updated_todo.dict().items():
      setattr(db_todo,key,value)
    self.db.commit()
    return {"message": "todo updated successfully"}
    
  # deleting todo
  def delete_todo(self,todo_id):
    db_todo = self.db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo is None:
      raise HTTPException(status_code=404,detail="Todo not found")
    self.db.delete(db_todo)
    self.db.commit()
    return {"message": "todo deleted successfully"}





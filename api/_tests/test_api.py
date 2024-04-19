from fastapi.testclient import TestClient
from api.index import app

client = TestClient(app)
todo_id = None
def test_create_todo():
  response = client.post("/api/todos",json={"title": "Test Todo", "description": "Test Description" , "userid":1})
  assert response.status_code == 200
  global todo_id
  todo_id  = response.json().get("id")
  assert response.json() ==  {"id":todo_id,"title": "Test Todo", "description": "Test Description" , "userid":1}
  
def test_read_todos():
 user_id = 1
 response = client.get(f"/api/todos/{user_id}")
 assert response.status_code == 200 
 assert response.json()["message"] == "todos fetched successfully"
 actual_data = response.json()["data"][-1]  #getting last data created
 expected_data = {"id":todo_id,"title": "Test Todo", "description": "Test Description" , "userid":1}
 assert expected_data == actual_data

def test_update_todo():
  response = client.put(f"/api/todos/{todo_id}", json={'title': 'test todo3', 'description': 'this is test todo3', 'userid': 1})
  assert response.status_code == 200
  assert response.json() == {"message": "todo updated successfully"}

def test_delete_todo():
  response = client.delete(f"/api/todos/{todo_id}")
  assert response.status_code == 200
  assert response.json() == {"message": "todo deleted successfully"}
  

import { useRouter } from "next/navigation";
import React from "react";
import { deleteTodo } from "../app/client";

const TodoList = ({
  todos,
  setTodos,
  setEditingTodo,
  setNewTodo,
}: {
  todos: any;
  setTodos: any;
  setEditingTodo: any;
  setNewTodo: any;
}) => {
  const router = useRouter();
  const deletefunc = (id: any) => {
    deleteTodo(id);
    setTodos(todos.filter((todo: any) => todo.id !== id));
    router.refresh();
  };

  const editTodo = (id: any) => {
    const todoToEdit = todos.find((todo: any) => todo.id === id);
    setEditingTodo(todoToEdit);
    setNewTodo({
      title: todoToEdit.title,
      description: todoToEdit.description,
    });
  };
  return (
    <ul className="list-disc">
      {todos?.map((todo: any) => (
        <li key={todo.id} className="flex items-center mb-2">
          <div>
            <h2 className="text-xl font-bold mb-1">{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
          <div className="ml-auto">
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={() => editTodo(todo.id)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deletefunc(todo.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

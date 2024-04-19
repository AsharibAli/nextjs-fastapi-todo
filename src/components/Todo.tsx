"use client";
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { createTodo, updateTodo } from "../app/client";
const Todo = ({ data }: any) => {
  const [todos, setTodos] = useState<any>(data?.data);

  const [newTodo, setNewTodo] = useState<any>({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const router = useRouter();

  const addTodo = async () => {
    if (newTodo.title.trim() !== "" && newTodo.description.trim() !== "") {
      const userId = Cookies.get("userId");
      const todo = {
        id: Math.floor(Math.random() * 100),
        title: newTodo.title,
        description: newTodo.description,
        userid: userId,
      };
      await createTodo(todo);
      setNewTodo({ title: "", description: "" });
      router.refresh();
    }
  };

  const update = async () => {
    const todo = {
      id: editingTodo.id,
      title: newTodo.title,
      description: newTodo.description,
      userid: editingTodo.userid,
    };
    await updateTodo(todo);
    setEditingTodo(null);
    setNewTodo({ title: "", description: "" });
    router.refresh();
  };
  useEffect(() => {
    setTodos(data?.data);
  }, [data]);
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-1/2 mr-2"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 w-1/2 mr-2"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        {editingTodo ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={update}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={addTodo}
          >
            Add Todo
          </button>
        )}
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        setEditingTodo={setEditingTodo}
        setNewTodo={setNewTodo}
      />
    </div>
  );
};

export default Todo;

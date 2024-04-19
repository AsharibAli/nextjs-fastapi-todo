import Cookies from "js-cookie";
const getToken = () => {
  const token = Cookies.get("token");
  return token;
};
export const createTodo = async (todo: any) => {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to post data");
  }
  return res.json();
};

export const updateTodo = async (newTodo: any) => {
  const res = await fetch(`/api/todos/${newTodo.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to update data");
  }
  return res.json();
};

export const deleteTodo = async (todoId: number) => {
  const res = await fetch(`/api/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to delete data");
  }
  return res.json();
};

export const registerUser = async (user: any) => {
  const res = await fetch(`/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Invalid Credentials");
  }
  return res.json();
};

export const loginUser = async (user: any) => {
  const res = await fetch(`/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Invalid Credentials");
  }
  return res.json();
};

export const getTodos = async (userId: number) => {
  const res = await fetch(`${process.env.URL}/api/todos/${userId}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

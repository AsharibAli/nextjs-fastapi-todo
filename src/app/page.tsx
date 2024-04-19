import Todo from "../components/Todo";
import { getTodos } from "./server";
import { cookies } from "next/headers";

export default async function Home() {
  const userId = cookies().get("userId")?.value;
  const todosData = await getTodos(Number(userId));

  return <Todo data={todosData} />;
}

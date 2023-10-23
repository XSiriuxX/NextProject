"use client";
import { useRouter } from "next/navigation";

export default function TaskCard({ task }) {
  const router = useRouter();
  return (
    <div
      className=" bg-slate-950 p-3 hover:bg-slate-900 hover:cursor-pointer"
      onClick={() => {
        router.push("/edit/" + task.id);
      }}
    >
      <h2 className=" font-bold text-2xl mb-2 mx-auto">{task.title}</h2>
      <p className=" text-xl">{task.description}</p>
      <p className=" text-xs mt-2">
        {new Date(task.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
    </div>
  );
}

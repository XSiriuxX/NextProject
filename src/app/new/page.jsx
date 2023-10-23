"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formTitle, setFormTitle] = useState("Creando");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
        });
      setFormTitle("Actualizando");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className=" text-xl font-bold mb-5 ">{formTitle}</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">TITLE</label>
        </div>
        <input
          id="title"
          type="text"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">DESCRIPTION</label>
        </div>
        <textarea
          id="description"
          rows="3"
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          title={description}
          value={description}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {params.id ? "Actualizar" : "Crear"}
          </button>

          {params.id && (
            <button
              type="button"
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={async () => {
                const res = await fetch(`/api/tasks/${params.id}`, {
                  method: "DELETE",
                });
                const data = await res.json();
                console.log(data);
                router.refresh();
                router.push("/");
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NewPage;

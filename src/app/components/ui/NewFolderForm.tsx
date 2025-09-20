import { Icon } from "@iconify/react";
import React from "react";

interface NewFileFormProps {
  handleNewFolder: (title: string, folderId: string) => void;
  userId: string;
}

export default function NewFolderForm(props: NewFileFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (title.trim()) {
      const res = await fetch("/api/folder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, userId: props.userId }),
      });
      const result = await res.json();
      if (result.success || result.folder) {
        props.handleNewFolder(result.title, result.folderId);
      } else {
        alert(result.message || "Something went wrong")
      }
    }
  }
  return (
    <form
      className={`flex py-2.5 gap-3.75 text-white bg-white/3 transition items-center px-5`}
      onSubmit={handleSubmit}
    >
      <button type="submit" className="cursor-pointer hover:opacity-80">
        <Icon
          icon={"material-symbols:folder-open-outline"}
          className="text-xl"
        />
      </button>
      <input
        id="FolderField"
        name="title"
        className={`min-w-20 max-w-30 py-0.25 font-semibold text-white px-0.5
        border-1 border-white/40 focus:outline-none`}
      ></input>
    </form>
  );
}

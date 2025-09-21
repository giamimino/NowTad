import { Icon } from "@iconify/react";
import React from "react";

interface NewFileFormProps {
  handleNewNote: (title: string) => void;
}

export default function NewNoteForm(props: NewFileFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (title.trim()) {
      props.handleNewNote(title)
    }
  }
  return (
    <form
      className={`flex py-2.5 gap-3.75 text-white bg-white/3 transition items-center px-5`}
      onSubmit={handleSubmit}
    >
      <button type="submit" className="cursor-pointer hover:opacity-80">
        <Icon
          icon={"basil:document-outline"}
          className="text-xl"
        />
      </button>
      <input
        id="FolderField"
        name="title"
        className={`min-w-25 max-w-35 py-0.25 font-semibold text-white px-0.5
        border-1 border-white/40 focus:outline-none`}
      ></input>
    </form>
  );
}

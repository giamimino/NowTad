import React from "react";
import Note from "./ui/Note";

interface PageProps {
  content: String;
  folder: String;
}
export default function NotesList(props: PageProps) {
  return (
    <div className="w-87.5 bg-[#1C1C1C] h-[100vh] py-7.5 px-5 flex flex-col gap-7.5">
      <h1 className="text-[22px] font-semibold text-white">{props.folder}</h1>
      <div className="flex flex-col gap-5">
        <Note
          title="My Goals for the Next Year"
          content="As the year comes to a what"
          select={false}
          createdAt={new Date()}
          id="wddwda"
        />
      </div>
      
    </div>
  );
}

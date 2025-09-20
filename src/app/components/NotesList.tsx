import React from "react";
import Note from "./ui/Note";

interface PageProps {
  folder: String;
  notes: { title: string, content: string, id: string, createdAt: Date}[]
}
export default function NotesList(props: PageProps) {
  return (
    <div className="w-87.5 bg-[#1C1C1C] h-[100vh] py-7.5 px-5 flex flex-col gap-7.5">
      <h1 className="text-[22px] font-semibold text-white">{props.folder}</h1>
      <div className="flex flex-col gap-5">
        {props.notes.map(
          (n) => (
            <Note
              {...n}
              select={false}
            />
          )
        )}
      </div>
      
    </div>
  );
}

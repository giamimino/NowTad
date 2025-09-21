"use client"
import React, { useState } from "react";
import Note from "./ui/Note";
import { NotePreview } from "../global";

interface PageProps {
  folder: String;
  notes: NotePreview[]
  handleSelectNote: (id: string, folderId: string) => void
  currentNote: {id: string, title: string, folderId: string } | null
}
export default function NotesList(props: PageProps) {
  const [cur, setCur] = useState("")
  
  return (
    <div className="w-87.5 bg-[#1C1C1C] h-[100vh] py-7.5 px-5 flex flex-col gap-7.5">
      <h1 className="text-[22px] font-semibold text-white">{props.folder}</h1>
      <div className="flex flex-col gap-5">
        {props.notes.map(
          (n) => (
            <Note
              key={n.id}
              select={props.currentNote?.id === cur ? true : false}
              props={n}
              onSelect={(id: string, folderId: string) => {
                setCur(id)
                props.handleSelectNote(id, folderId)
              }}
            />
          )
        )}
      </div>
      
    </div>
  );
}

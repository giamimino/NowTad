"use client"
import React, { useContext, useState } from "react";
import SideBarNav from "./components/SideBarNav";
import NotesList from "./components/NotesList";
import Editor from "./components/Editor";
import { NotesContext } from "./context/NotesContext";
import { NoteContext } from "./global";
import { SessionContext } from "./context/SessionContext";

export default function Home() {
  const [content, setContent] = useState<NoteContext[]>([])
  const user = useContext(SessionContext)
  
  return (
    <div className="flex overflow-hidden h-full w-full">
      <SideBarNav
        folder={user?.folders ?? []}
        recents={user?.recents ?? []}
      />
      <NotesList content={"what"} folder={"Personal"} />
      <NotesContext.Provider
        value={{content, setContent}}
      >
      </NotesContext.Provider>
    </div>
  );
}

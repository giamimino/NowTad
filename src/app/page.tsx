"use client"
import React, { useCallback, useContext, useState } from "react";
import SideBarNav from "./components/SideBarNav";
import NotesList from "./components/NotesList";
import Editor from "./components/Editor";
import { NotesContext } from "./context/NotesContext";
import { NoteContext } from "./global";
import { SessionContext } from "./context/SessionContext";

export default function Home() {
  const [content, setContent] = useState<NoteContext[]>([])
  const [selectedFolder, setSelectedFolder] = useState<{ title: string, id: string } | null>(null)
  const sessionContext = useContext(SessionContext)
  const { user, setUser } = sessionContext ?? {
    user: null,
    setUser: () => {}
  }

  const handleNewFolder = useCallback(( title: string, folderId: string  ) => {
    setUser(prev => prev ?
      {
        ...prev,
        folders: 
        [
          ...prev.folders,
          {
            id: folderId,
            title: title
          }
        ]
      } : prev
    )
  }, [])

  const handleFolderSelect = (id: string) => {
    const folder = user?.folders.find(
      (f) => f.id === id
    )
    
    setSelectedFolder(
      {
        id,
        title: folder?.title ?? "No Folder is Selected"
      }
    )
  }
  
  
  return (
    <div className="flex overflow-hidden h-full w-full">
      <SideBarNav
        folder={user?.folders ?? []}
        recents={user?.recents ?? []}
        userId={user?.id ?? ""}
        handleNewFolder={handleNewFolder}
        onSelect={handleFolderSelect}
      />
      <NotesList folder={selectedFolder?.title ?? "No Folder is Selected"} notes={[]} />
      <NotesContext.Provider
        value={{content, setContent}}
      >
      </NotesContext.Provider>
    </div>
  );
}

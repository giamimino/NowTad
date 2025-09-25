"use client";
import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import File from "./ui/File";
import NewFolderForm from "./ui/NewFolderForm";
import DraggableFolder from "./ui/DraggableFolder";
import NewNoteForm from "./ui/NewNoteForm";
import fetchFavorites from "@/functions/fetchFavorite";

interface SideBarNavProps {
  folder: { title: string; id: string }[];
  recents: {
    title: string;
    id: string,
    updatedAt: string
  }[];
  userId: string;
  handleNewFolder: (title: string) => void;
  handleNewNote: (title: string) => void;
  onSelect: (id: string) => void;
  handleTrashDelete: (id: string) => void;
  handleGetFavorites: (favoriteId: string, favorites: {id: string, noteId: string}[]) => void
}

export default function SideBarNav(sideBarNavProps: SideBarNavProps) {
  const [newFolder, setNewFolder] = useState(false);
  const [newNote, setNewNote] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("");
  const trashRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const moreProps = [
    { icon: "tabler:star", label: "Favorites" },
    { icon: "uil:trash", label: "Trash" },
  ];

  return (
    <div
      ref={sidebarRef}
      className="py-7.5  flex flex-col gap-7.5 w-75 h-[100vh]"
    >
      <div className="px-5 flex w-full justify-between items-center">
        <h1 className="font-kaushan text-3xl text-white">NowTed</h1>
        <Icon
          icon={"iconamoon:search-bold"}
          className="text-white/40 w-5 h-5 tracking-tighter
        cursor-pointer"
        />
      </div>
      <div className="px-5">
        <button
          onClick={() => setNewNote((prev) => !prev)}
          className="w-full bg-white/5 p-2.5 flex items-center justify-center
        gap-2 text-white duration-300 font-semibold cursor-pointer rounded-[3px] ringHover-1"
        >
          <Icon icon={"ic:round-add"} className="text-xl" />
          <span>New Note</span>
        </button>
      </div>
      <div>
        <h1 className="smallH-1 px-5">Recents</h1>
        <div>
          {newNote && (
            <NewNoteForm
              handleNewNote={(title: string) => {
                sideBarNavProps.handleNewNote(title);
                setNewNote(false);
              }}
            />
          )}
          {sideBarNavProps.recents.map((r) => (
            <File
              title={r.title}
              key={r.id}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="smallH-1 flex justify-between px-5">
          <span>Folders</span>
          <button onClick={() => setNewFolder((prev) => !prev)}>
            <Icon
              icon={"streamline:folder-add-remix"}
              className="text-white cursor-pointer"
            />
          </button>
        </h1>
        <div className="flex flex-col gap-1.25">
          {newFolder && (
            <NewFolderForm
              handleNewFolder={(title: string) => {
                sideBarNavProps.handleNewFolder(title);
                setNewFolder(false);
              }}
            />
          )}
          {sideBarNavProps.folder.map((f) => (
            <DraggableFolder
              key={f.id}
              f={f}
              sidebarRef={sidebarRef}
              trashRef={trashRef}
              currentFolder={currentFolder}
              onSelect={(id: string) => {
                sideBarNavProps.onSelect(id);
                setCurrentFolder(id);
              }}
              handleTrashDelete={sideBarNavProps.handleTrashDelete}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="smallH-1 px-5">More</h1>
        <div>
          {moreProps.map((m) => (
            <div
              className={`flex py-2.5 gap-3.75 px-5`}
              key={m.label}
              ref={m.label === "Trash" ? trashRef : null}
              onClick={m.label === "Favorites" ? async () => {
                setCurrentFolder("")
                const result = await fetchFavorites(sideBarNavProps.userId)
                setCurrentFolder(result[0].id)
                sideBarNavProps.handleGetFavorites(result[0].id, result)
              } : undefined}
            >
              <Icon icon={m.icon} className="text-xl text-white/60" />
              <span className="smallH-1">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

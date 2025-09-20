import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import File from "./ui/File";
import Folder from "./ui/Folder";
import NewFolderForm from "./ui/NewFolderForm";
import { motion, PanInfo, Reorder } from "framer-motion";

interface SideBarNavProps {
  folder: { title: string, id: string }[],
  recents: { label: string, id: string }[],
  userId: string,
  handleNewFolder: (title: string, folderId: string) => void;
  onSelect: (id: string) => void,
}

export default function SideBarNav(sideBarNavProps: SideBarNavProps) {
  const [newFolder, setNewFolder] = useState(false)
  const [folders, setFolders] = useState<{ title: string, id: string }[]>(sideBarNavProps.folder || []);
  const [currentFolder, setCurrentFolder] = useState("")
  const trashRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const moreProps = [
    { icon: "tabler:star", label: "Favorites" },
    { icon: "uil:trash", label: "Trash" },
    { icon: "flowbite:archive-outline", label: "Archived Notes" },
  ];

  useEffect(() => {
    setFolders(sideBarNavProps.folder)
  }, [sideBarNavProps.folder])
  
  return (
    <div ref={sidebarRef} className="py-7.5  flex flex-col gap-7.5 w-75 h-[100vh]">
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
          className="w-full bg-white/5 p-2.5 flex items-center justify-center
        gap-2 text-white duration-300 font-semibold cursor-pointer rounded-[3px] ringHover-1"
        >
        <Icon icon={"ic:round-add"} className="text-xl" />
        <span>New Note</span>
      </button>
      </div>
      <div className="px-5">
        <h1 className="smallH-1">Recents</h1>
        <div>
        {sideBarNavProps.recents.map(
          (r) => (
            <File
              {...r}
              select={false}
            />
          )
        )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="smallH-1 flex justify-between px-5">
          <span>Folders</span>
          <button onClick={() => setNewFolder(prev => !prev)}>
            <Icon
              icon={"streamline:folder-add-remix"}
              className="text-white cursor-pointer"
            />
          </button>
        </h1>
        <div className="flex flex-col gap-1.25">
          <Reorder.Group values={folders} onReorder={setFolders} axis="y">
          {newFolder && (
            <NewFolderForm
              handleNewFolder={(title: string, folderId: string) => {
                sideBarNavProps.handleNewFolder(title, folderId)
                setNewFolder(false)
              }}
              userId={sideBarNavProps.userId}
            />
          )}
            {folders.map(
              (f) => (
                <Reorder.Item value={f} key={f.id}>
                  <motion.div
                    drag
                    dragConstraints={sidebarRef}
                    onDragEnd={(event, info: PanInfo) => {
                      if (!trashRef.current) return;

                      const rect = trashRef.current.getBoundingClientRect();
                      const { x, y } = info.point;

                      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                        console.log("Dropped on trash! Delete folder here.");
                      }
                    }}
                  >
                    <Folder
                      {...f}
                      select={currentFolder === f.id ? true : false}
                      onSelect={(id: string) => {
                        sideBarNavProps.onSelect(id)
                        setCurrentFolder(id)
                      }}
                    />
                  </motion.div>
                </Reorder.Item>
              )
            )}
          </Reorder.Group>
        </div>
      </div>
      <div>
        <h1 className="smallH-1 px-5">More</h1>
        <div>
          {moreProps.map((m) => (
            <div className="flex py-2.5 gap-3.75 px-5" key={m.label} ref={m.label === "Trash" ? trashRef : null}>
              <Icon icon={m.icon} className="text-xl text-white/60" />
              <span className="smallH-1">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

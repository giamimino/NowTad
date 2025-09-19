import { Icon } from "@iconify/react";
import React from "react";
import File from "./ui/File";
import Folder from "./ui/Folder";

interface SideBarNavProps {
  folder: { label: string, id: string }[],
  recents: { label: string, id: string }[],
}

export default function SideBarNav(sideBarNavProps: SideBarNavProps) {
  const moreProps = [
    { icon: "tabler:star", label: "Favorites" },
    { icon: "uil:trash", label: "Trash" },
    { icon: "flowbite:archive-outline", label: "Archived Notes" },
  ];
  return (
    <div className="py-7.5 px-5 flex flex-col gap-7.5 w-75 h-[100vh]">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-kaushan text-3xl text-white"> NowTed</h1>
        <Icon
          icon={"iconamoon:search-bold"}
          className="text-white/40 w-5 h-5 tracking-tighter
        cursor-pointer"
        />
      </div>
      <button
        className="w-full bg-white/5 p-2.5 flex items-center justify-center
      gap-2 text-white duration-300 font-semibold cursor-pointer rounded-[3px] ringHover-1"
      >
        <Icon icon={"ic:round-add"} className="text-xl" />
        <span>New Note</span>
      </button>
      <div>
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
      <div>
        <h1 className="smallH-1 flex justify-between">
          <span>Folders</span>
          <Icon
            icon={"streamline:folder-add-remix"}
            className="text-white cursor-pointer"
          />
        </h1>
        <div>
          {sideBarNavProps.folder.map(
            (f) => (
              <Folder
                {...f}
                select={false}
              />
            )
          )}
        </div>
      </div>
      <div>
        <h1 className="smallH-1">More</h1>
        <div>
          {moreProps.map((m) => (
            <div className="flex py-2.5 gap-3.75" key={m.label}>
              <Icon icon={m.icon} className="text-xl text-white/60" />
              <span className="smallH-1">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

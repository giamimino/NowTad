import { Icon } from "@iconify/react";
import React from "react";

interface FolderProps {
  title: string;
  select: boolean;
  id: string;
  onSelect: (id: string) => void
  dragged: boolean
}

export default function Folder(props: FolderProps) {
  return (
    <div
      className={`flex py-2.5 gap-3.75 ${
        props.select ? "text-white bg-white/3" : "text-white/60 bg-transparent"
      } transition items-center select-none cursor-pointer px-5`}
      onClick={() => props.onSelect(props.id)}
    >
      <Icon
        icon={
          props.select
            ? "material-symbols:folder-open-outline"
            : "material-symbols:folder-outline"
        }
        className={`text-xl transition duration-300 ${props.dragged ? "text-red-600" : ""}`}
      />
      <span className={`text-nowrap truncate font-semibold transition duration-300 ${props.dragged ? "text-red-600" : ""}`}>
        {props.title}
      </span>
    </div>
  );
}

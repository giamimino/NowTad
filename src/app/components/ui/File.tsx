import { Icon } from "@iconify/react";
import React from "react";

interface FileProps {
  select: boolean;
  note: {
    title: string;
    id: string;
    folderId: string;
    createdAt: string;
  }
  onSelect: (
    note: {
      title: string;
      id: string;
      folderId: string;
      createdAt: string;
    },
    select: "unSelect" | "select"
  ) => void;
}

export default function File(props: FileProps) {
  return (
    <div
      className={`flex py-2.5 gap-3.75 px-5 ${
        props.select
          ? "text-white bg-[#312EB5]"
          : "text-white/60 bg-transparent"
      } transition items-center cursor-pointer hover:opacity-60`}
      onClick={() => {
        if (!props.select) {
          props.onSelect(props.note, "select");
        } else {
          props.onSelect(props.note, "unSelect");
        }
      }}
    >
      <Icon icon={"basil:document-outline"} className="text-xl" />
      <span className={`text-nowrap truncate font-semibold`}>
        {props.note.title}
      </span>
    </div>
  );
}

import { NotePreview } from "@/app/global";
import React from "react";

export default function Note({
  props,
  select,
  onSelect,
}: {
  props: NotePreview;
  select: boolean;
  onSelect: (id: string, folderId: string) => void;
}) {
  return (
    <div
      className={`flex flex-col p-5 gap-2.5 rounded-[3px] ${
        select ? "bg-white/10" : "bg-white/3"
      } transition cursor-pointer hover:bg-white/5`}
      onClick={() => onSelect(props.id, props.folderId)}
    >
      <h1 className="text-lg font-semibold text-white">{props.title}</h1>
      <div className="flex gap-2.5">
        <span className={`text-nowrap text-white/40`}>
          {`${String(new Date(props.createdAt).getDate()).padStart(
            2,
            "0"
          )}/${String(new Date(props.createdAt).getMonth()).padStart(
            2,
            "0"
          )}/${new Date(props.createdAt).getFullYear()}`}
        </span>
        <span className={`text-nowrap truncate text-white/60`}>
          {props.preview}
        </span>
      </div>
    </div>
  );
}

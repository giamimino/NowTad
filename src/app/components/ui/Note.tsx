import { NotePreview } from "@/app/global";
import { Icon } from "@iconify/react";
import React from "react";

export default function Note({
  props,
  select,
  onSelect,
  type,
  handleRemoveFav,
}: {
  props: NotePreview;
  type: "Default" | "Favorite"
  select: boolean;
  onSelect: (id: string, folderId: string) => void;
  handleRemoveFav?: (favoriteId: string) => void
}) {
  return (
    <div className="relative">
      {type === "Favorite" && handleRemoveFav && (
        <button className="absolute cursor-pointer top-5 right-5 z-10 text-red-600 hover:text-red-500"
        onClick={() => handleRemoveFav(props.id)}>
          <Icon icon={"tabler:star-off"} />
        </button>
      )}
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
    </div>
  );
}

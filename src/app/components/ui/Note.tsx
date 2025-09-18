import React from "react";

interface NoteProps {
  title: string;
  content: string;
  select: boolean;
  id: string;
  createdAt: Date;
}

export default function Note(props: NoteProps) {
  return (
    <div
      className={`flex flex-col p-5 gap-2.5 rounded-[3px] ${
        props.select ? "bg-white/10" : "bg-white/3"
      } transition cursor-pointer hover:bg-white/5`}
    >
      <h1 className="text-lg font-semibold text-white">{props.title}</h1>
      <div className="flex gap-2.5">
        <span className={`text-nowrap text-white/40`}>
          {`${String(props.createdAt.getDate()).padStart(2, "0")}/${String(
            props.createdAt.getMonth()
          ).padStart(2, "0")}/${props.createdAt.getFullYear()}`}
        </span>
        <span className={`text-nowrap truncate text-white/60`}>
          {props.content}
        </span>
      </div>
    </div>
  );
}

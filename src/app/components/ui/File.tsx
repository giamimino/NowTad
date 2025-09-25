import { Icon } from "@iconify/react";
import React from "react";

interface FileProps {
  title: string
}

export default function File(props: FileProps) {
  return (
    <div
      className={`flex py-2.5 gap-3.75 px-5 
        text-white/60 bg-transparent transition items-center 
        cursor-pointer hover:opacity-60`}
    >
      <Icon icon={"basil:document-outline"} className="text-xl" />
      <span className={`text-nowrap truncate font-semibold`}>
        {props.title}
      </span>
    </div>
  );
}

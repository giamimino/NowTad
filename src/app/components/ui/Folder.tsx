import { Icon } from "@iconify/react";
import React from "react";

interface FileProps {
  label: string;
  select: boolean;
  id: string;
}

export default function Folder(props: FileProps) {
  return (
    <div
      className={`flex py-2.5 gap-3.75 ${
        props.select ? "text-white bg-white/3" : "text-white/60 bg-transparent"
      } transition items-center`}
    >
      <Icon
        icon={
          props.select
            ? "material-symbols:folder-open-outline"
            : "material-symbols:folder-outline"
        }
        className="text-xl"
      />
      <span className={`text-nowrap truncate font-semibold`}>
        {props.label}
      </span>
    </div>
  );
}

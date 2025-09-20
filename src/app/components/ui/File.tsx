import { Icon } from "@iconify/react";
import React from "react";

interface FileProps {
  label: string;
  select: boolean;
  id: string;
}

export default function File(props: FileProps) {
  return (
    <div
      className={`flex py-2.5 gap-3.75 px-5 ${
        props.select
          ? "text-white bg-[#312EB5]"
          : "text-white/60 bg-transparent"
      } transition items-center cursor-pointer`}
    >
      <Icon icon={"basil:document-outline"} className="text-xl" />
      <span className={`text-nowrap truncate font-semibold`}>
        {props.label}
      </span>
    </div>
  );
}

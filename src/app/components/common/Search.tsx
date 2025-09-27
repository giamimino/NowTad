import { Icon } from "@iconify/react";
import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Search(props: Props) {
  return (
    <div
      className="p-2.5 flex gap-2 w-full items-center bg-white/5 rounded-[3px] transition
      focus-within:ring-3 focus-within:ring-white/5 focus-within:ring-offset-3 focus-within:ring-offset-[#181818]"
    >
      <label htmlFor="searchField">
        <Icon
          icon={"iconamoon:search-bold"}
          className="w-5 h-5 opacity-50 text-white hover:opacity-100 cursor-pointer"
        />
      </label>
      <input
        type="text"
        id="searchField"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        placeholder="Search note"
        className="font-semibold placeholder:text-white/60 text-white/90 
        w-full h-6 focus:outline-0"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
    </div>
  );
}

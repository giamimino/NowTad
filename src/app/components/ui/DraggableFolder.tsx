"use client"
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";
import Folder from "./Folder";
import React, { useState } from "react";

interface Props {
  f: { title: string, id: string }
  sidebarRef: React.RefObject<HTMLDivElement | null>
  trashRef: React.RefObject<HTMLDivElement | null>
  currentFolder: string,
  onSelect: (id: string) => void,
  handleTrashDelete: (id: string) => void
}

function DraggableFolder({
  f,
  sidebarRef,
  trashRef,
  currentFolder,
  onSelect,
  handleTrashDelete
}: Props) {
  const [isOverTrash, setIsOverTrash] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleDragEnd(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (!trashRef.current) {
      animate(x, 0, {type: "spring", stiffness: 200 });
      animate(y, 0, {type: "spring", stiffness: 200 });
      return;
    }

    const rect = trashRef.current.getBoundingClientRect();
    const { x: px, y: py } = info.point;

    if (px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom) {
      handleTrashDelete(f.id)
    } else {
      animate(x, 0, {type: "spring", stiffness: 200 });
      animate(y, 0, {type: "spring", stiffness: 200 });
    }
  }

  function handleDrag(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (!trashRef.current) {
      animate(x, 0, {type: "spring", stiffness: 200 });
      animate(y, 0, {type: "spring", stiffness: 200 });
      return;
    }

    const rect = trashRef.current.getBoundingClientRect();
    const { x: px, y: py } = info.point;

    const over = px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom

    if (over && !isOverTrash) {
      setIsOverTrash(true);
    } else if(!over && isOverTrash) {
      setIsOverTrash(false);
    } else {
      animate(x, 0, {type: "spring", stiffness: 200 });
      animate(y, 0, {type: "spring", stiffness: 200 });
    }
  }

  return (
    <motion.div
      drag
      dragConstraints={sidebarRef}
      style={{ x, y, touchAction: "none" }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <Folder
        {...f}
        select={currentFolder === f.id}
        onSelect={onSelect}
        dragged={isOverTrash}
      />
    </motion.div>
  );
}

export default DraggableFolder
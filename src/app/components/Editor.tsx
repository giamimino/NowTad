"use client";
import { Icon } from "@iconify/react";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { NotesContext } from "../context/NotesContext";
import { AnimatePresence, motion } from "framer-motion";

interface EditorProps {
  title: string;
  folder: string;
  noteId: string;
  folderId: string;
  createdAt: Date;
  handleNoteDelete: (id: string) => void
  handleCreateFav: (noteId: string) => void
}
export default function Editor(props: EditorProps) {
  const notesContext = useContext(NotesContext);
  if (!notesContext) return null;
  const { content, setContent } = notesContext;
  const [curFont, setCurFont] = useState(16);
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const debouncedContent = useDebounce(editorContent, 500);
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    if (!debouncedContent) return;
    const exist = content.some((n) => n.id === props.noteId);

    if (exist) {
      const newContent = content.map((c) =>
        c.id === props.noteId
          ? {
              ...c,
              content: debouncedContent,
              isChanged: true,
            }
          : c
      );
      setContent(newContent);
    } else {
      const preview = debouncedContent?.content?.[0]?.content?.[0]?.text ?? "";
      const newContent = [
        ...content,
        {
          title: props.title,
          id: props.noteId,
          createdAt: props.createdAt.toISOString(),
          folderId: props.folder,
          content: debouncedContent,
          isChanged: false,
          preview,
        },
      ];
      setContent(newContent);
    }
  }, [debouncedContent]);

  const note = useMemo(() => {
    const result = content.find((n) => n.id === props.noteId);

    return result;
  }, [content, props]);

  const editor = useEditor(
    {
      extensions: [StarterKit, TextStyle, FontSize],
      content: note?.content ?? "",
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        setEditorContent(editor.getJSON());
      },
    },
    [note]
  );

  useEffect(() => {
    if (curFont === 0 || !curFont) return;
    editor?.chain().focus().setFontSize(`${curFont}px`).run();
  }, [curFont]);

  const handleNoteDelete = useCallback(async () => {
    const res = await fetch("/api/note/delete", {
      method: "POST",
      headers: {"Content-Type": 'Application/json'},
      body: JSON.stringify({ noteId: props.noteId })
    })
    const result = await res.json()
    if(result.success) {
      props.handleNoteDelete(result.noteId)
    } else {
      alert(result.message || "Something went wrong.")
    }
  }, [props.noteId])
  return (
    <div className="p-12.5 flex flex-col gap-7.5 w-full h-full relative">
      <div className="relative select-none">
        <div
          className={`absolute text-white w-7.5 h-7.5 rounded-full
          flex justify-center items-center right-0 border-1 border-white cursor-pointer
          ${openSettings ? " opacity-100" : "opacity-60"} hover:opacity-70`}
          onClick={() => setOpenSettings((prev) => !prev)}
        >
          <Icon icon={"tabler:dots"} />
        </div>
        <AnimatePresence>
          {openSettings && (
            <motion.div
              initial={{ opacity: 0, translateY: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, translateY: 0, filter: "blur(0)" }}
              exit={{ opacity: 0 }}
              transition={{delay: 0.1, duration: 0.4}}
              className="p-3.75 flex absolute flex-col gap-5 bg-[#333333] rounded-[6px] right-8 top-8"
            >
              <button
                className="flex items-center cursor-pointer
               gap-3.75 text-white hover:opacity-80"
               onClick={() => props.handleCreateFav(props.noteId)}
               >
                <Icon icon={"tabler:star"} />
                <span>Add to favorites</span>
              </button>
              <span className="w-full bg-white/5 h-0.25"></span>
              <button
                className="flex items-center cursor-pointer
                gap-3.75 text-white hover:opacity-80"
                onClick={handleNoteDelete}
              >
                <Icon icon={"uil:trash"} />
                <span>Delete</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h1 className="text-nowrap text-white text-3xl font-semibold">
        {props.title}
      </h1>
      <div className="flex flex-col">
        <div className="flex gap-5">
          <Icon icon={"solar:calendar-outline"} className="text-white/60" />
          <span className="text-sm text-white/60">Date</span>
          <span
            className={`text-nowrap text-sm font-semibold
            text-white underline ml-5`}
          >
            {`${String(props.createdAt.getDate()).padStart(2, "0")}/${String(
              props.createdAt.getMonth()
            ).padStart(2, "0")}/${props.createdAt.getFullYear()}`}
          </span>
        </div>
        <span className="w-full bg-white/10 h-0.25 my-3.75"></span>
        <div className="flex gap-5">
          <Icon
            icon={"material-symbols:folder-outline"}
            className="text-white/60"
          />
          <span className="text-sm text-white/60">Folder</span>
          <span
            className={`text-nowrap text-sm font-semibold
            text-white underline ml-5`}
          >
            {props.folder}
          </span>
        </div>
      </div>
      <div className="flex border-y-1 border-white/10 py-2.75 gap-5">
        <div className="flex items-center">
          <input
            type="number"
            className="appearance-none 
         [&::-webkit-inner-spin-button]:appearance-none 
         [&::-webkit-outer-spin-button]:appearance-none 
         [&::-moz-inner-spin-button]:appearance-none 
         [&::-moz-outer-spin-button]:appearance-none 
         border rounded w-5 h-full border-none focus:outline-none text-white"
            id="editor_fontField_ujdwhd"
            value={curFont}
            onChange={(e) => {
              const value = Number(e.target.value);
              setCurFont((prev) =>
                !isNaN(value) && value < 32 ? value : prev
              );
            }}
            min={1}
            max={28}
          />
          <div className="flex flex-col">
            <button
              className="cursor-pointer text-white"
              onClick={() =>
                setCurFont((prev) =>
                  prev >= 2 || prev <= 28 ? prev + 1 : prev
                )
              }
            >
              <Icon icon={"mingcute:up-fill"} />
            </button>
            <button
              className="cursor-pointer text-white"
              onClick={() =>
                setCurFont((prev) => (prev >= 2 ? prev - 1 : prev))
              }
            >
              <Icon icon={"mingcute:down-fill"} />
            </button>
          </div>
        </div>
        <div className="text-white text-xl flex gap-2.5 items-center">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="w-5 h-5 cursor-pointer"
          >
            <Icon icon={"ooui:bold-b"} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="w-5 h-5 cursor-pointer"
          >
            <Icon icon={"lucide:italic"} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className="w-5 h-5 cursor-pointer"
          >
            <Icon icon={"tabler:underline"} />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="text-white noFocus" />
    </div>
  );
}

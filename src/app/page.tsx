"use client";
import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import SideBarNav from "./components/SideBarNav";
import NotesList from "./components/NotesList";
import Editor from "./components/Editor";
import { NotesContext } from "./context/NotesContext";
import { NoteContext, NotePreview } from "./global";
import { SessionContext } from "./context/SessionContext";
import Save from "./components/save";

export default function Home() {
  const [content, setContent] = useState<NoteContext[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<{
    title: string;
    id: string;
  } | null>(null);
  const [selectedNote, setSelectedNote] = useState<{
    title: string;
    id: string;
    folderId: string;
    createdAt: string;
  } | null>(null);
  const sessionContext = useContext(SessionContext);
  const { user, setUser } = sessionContext ?? {
    user: null,
    setUser: () => {},
  };

  const handleNewFolder = useCallback(
    async (title: string) => {
      const res = await fetch("/api/folder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, userId: user?.id }),
      });
      const result = await res.json();
      if (result.success) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                folders: [
                  ...prev.folders,
                  {
                    id: result.folder.id,
                    title: result.folder.title,
                    notes: [],
                  },
                ],
              }
            : prev
        );
      } else {
        alert(result.message || "Something went wrong");
      }
    },
    [user?.id]
  );

  const handleFolderSelect = (id: string) => {
    const folder = user?.folders.find((f) => f.id === id);

    setSelectedFolder({
      id,
      title: folder?.title ?? "No Folder is Selected",
    });
  };

  const handleNoteSelect = (id: string, folderId: string) => {
    const folder = user?.folders.find((f) => f.id === folderId);
    const note = folder?.notes.find((n) => n.id === id);
    if (!folder || !note) return;

    setSelectedNote({
      id: note.id,
      folderId: note.folderId,
      title: note.title,
      createdAt: note.createdAt,
    });
  };

  const handleTrashDelete = useCallback(
    async (id: string) => {
      const res = await fetch("/api/folder/delete", {
        method: "POST",
        headers: { "Conent-Type": "Application/json" },
        body: JSON.stringify({ id, userId: user?.id }),
      });
      const result = await res.json();
      if (result.success) {
        setUser((prev) =>
          prev
            ? {
                ...prev,
                folders: prev.folders.filter((f) => f.id !== result.folderId),
              }
            : prev
        );
      } else {
        alert(result.message ?? "Something went wrong.");
      }
    },
    [user?.id]
  );

  const handleNewNote = async (title: string) => {
    const res = await fetch("/api/note/create", {
      method: "POST",
      headers: { "Conent-Type": "Application/json" },
      body: JSON.stringify({ title, folderId: selectedFolder?.id }),
    });
    const result = await res.json();
    if (result.success) {
      const newNote: NotePreview = {
        ...result.note,
        createdAt: result.note.createdAt,
        updatedAt: result.note.updatedAt,
        folderId: result.note.folderId,
        title: result.note.title,
        preview: result.note.preview,
      };
      setUser((prev) => {
        if (!prev) return prev;

        const newFolders = prev.folders.map((f) =>
          f.id === newNote.folderId
            ? { ...f, notes: [...(f.notes ?? []), newNote] }
            : f
        );

        return { ...prev, folders: newFolders };
      });
    } else {
      alert(result.message || "Something went wrong.");
    }
  };

  const getNote = useCallback(async (note: NoteContext) => {
    setContent((prev) =>
      prev && !prev.some((n) => n.id === note.id)
        ? [...(prev || []), { ...note, isChanged: false }]
        : prev
    );
  }, []);

  const handleReacentNoteSelect = (
    note: {
      title: string;
      id: string;
      folderId: string;
      createdAt: string;
    },
    select: "unSelect" | "select"
  ) => {
    if (select === "select") {
      setSelectedNote({
        id: note.id, 
        title: note.title,
        folderId: note.folderId,
        createdAt: note.createdAt
      });
      setSelectedFolder({
        id: note.folderId,
        title: user?.folders.find((f) => f.id === note.folderId)?.title ?? ""
      })
    } else {
      setSelectedNote(null);
      setSelectedFolder(null)
    }
  };

  const filteredNotesbyFolder = useMemo(() => {
    if (!user) return [];
    setSelectedNote(null);
    return user.folders.find((f) => f.id === selectedFolder?.id)?.notes;
  }, [user, selectedFolder]);

  const fetchThis = useMemo(() => {
    const exist = content.some((c) => c.id === selectedNote?.id);

    return exist;
  }, [selectedNote]);

  const recents = useMemo(() => {
    if (!user) return;
    let result: {
      title: string;
      id: string;
      folderId: string;
      createdAt: string;
      updatedAt: string;
    }[] = [];
    let acc = 0;
    for (let i = 0; i < user.folders.length; i++) {
      for (let j = 0; j < user.folders[i].notes.length; j++) {
        if (acc >= 0 && acc <= 5) {
          result.push({
            ...user.folders[i].notes[j],
          });
          acc++;
        }
      }
    }
    return result.sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
  }, [user]);

  return (
    <div className="flex overflow-hidden h-full w-full">
      <SideBarNav
        folder={user?.folders ?? []}
        recents={recents ?? []}
        userId={user?.id ?? ""}
        handleNewFolder={handleNewFolder}
        onSelect={handleFolderSelect}
        handleTrashDelete={handleTrashDelete}
        handleNewNote={handleNewNote}
        handleNoteSelect={handleReacentNoteSelect}
      />
      <NotesList
        folder={selectedFolder?.title ?? "No Folder is Selected"}
        notes={filteredNotesbyFolder ?? []}
        handleSelectNote={handleNoteSelect}
        currentNote={selectedNote}
        getNote={getNote}
        fetchThis={!fetchThis}
      />
      <NotesContext.Provider value={{ content, setContent }}>
        {content.some((c) => c.isChanged === true) && <Save />}
        {selectedNote && (
          <Editor
            title={selectedNote.title as string}
            noteId={selectedNote.id as string}
            folderId={selectedNote.folderId as string}
            folder={selectedFolder?.title ?? ""}
            createdAt={new Date(selectedNote.createdAt)}
          />
        )}
      </NotesContext.Provider>
    </div>
  );
}

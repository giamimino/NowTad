export interface NoteContext {
  noteId: string,
  content: object,
  folderId: string,
} 

export interface User {
  id: string
  email: string,
  name: string,
  image: string,
  folders: Folder[]
  recents: Recents[]
}

export interface NotePreview {
  id: string,
  title: string,
  preview: string,
  createdAt: string,
  updatedAt: string,
  folderId: string
}

export interface Recents {
  id: string,
  label: string
}

export interface Folder {
  id: string,
  title: string,
  notes: NotePreview[]
}
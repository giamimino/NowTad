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

export interface Recents {
  id: string,
  label: string
}

export interface Folder {
  id: string,
  label: string,
}
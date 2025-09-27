import React from 'react'
import File from '../ui/File'
import { NoteContext } from '@/app/global'
import fetchDate from '@/functions/fetchDate'

interface Props {
  notes: { title: string, id: string, folderId: string }[],
  onClick: (id: string, folderId: string) => void
  getNote: (note: NoteContext) => void
}

export default function SearchResult(props: Props) {
  return (
    <div className='w-full bg-[#212121] mt-2 flex flex-col gap-1 absolute z-2'>
      {props.notes.length > 0 && (
        props.notes.map((n) => (
          <div
            key={n.id}
            onClick={async () => {
              props.getNote(await fetchDate(n.id))
              props.onClick(n.id, n.folderId)
            }}
          >
            <File
              {...n}
            />
          </div>
        ))
      )}
    </div>
  )
}

"use client"
import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { NotesContext } from '../context/NotesContext'

export default function Save() {
  const [dragging, setDragging] = useState(false)
  const notesContext = useContext(NotesContext)
  if (!notesContext) return null;
  const { content, setContent } = notesContext

  const saveAll = async () => {
    const filteredNotes = content.filter((c) => c.isChanged === true)
    
    const res = await fetch("/api/note/multi-save", {
      method: "POST",
      headers: { "Content-Type": 'Application/json' },
      body: JSON.stringify({ notes: filteredNotes })
    })
    const result = await res.json()
    if(result.success) {
      setContent([])
    } else {
      alert(result.message || "Something went wrong")
    }
  }
  return (
    <motion.div
      drag
      onDragStart={() => setDragging(false)}
      onDragEnd={() => setDragging(true)}
      initial={{top: 40, opacity: 0}}
      animate={{top: 0, opacity: 1}}
      exit={{top: 40, opacity: 0}}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
    >
      <div className={`bg-[#242424] fixed py-3 px-4 rounded-2xl flex flex-col gap-2.5 
      ${dragging ? "cursor-grab" : "cursor-grabbing"}
      w-[214px] bottom-5 left-1/2 -translate-x-1/2 z-[9999999999]`}>
        <p className='text-white/90 white'>You have unsaved changes.</p>
        <div className='flex w-full justify-between'>
          <button className='cursor-pointer text-white/50 hover:text-white/80'>clear</button>
          <button className='cursor-pointer text-white/90 hover:text-white' onClick={saveAll}>Save All</button>
        </div>
      </div>
    </motion.div>
  )
}

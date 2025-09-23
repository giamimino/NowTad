import { NoteContext } from "@/app/global";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function POST(req: Request) {
  try {
    const {
      folderId, 
      notes
    }: { 
      folderId: string, 
      notes:  NoteContext[]
    } = await req.json()
    if(!folderId || !notes) return errorResponse("There is nothing so save.")

    const requests = notes.map((note) => 
      prisma.note.update({
        where: { id: note.id },
        data: {
          title: note.title,
          content: note.content,
          folder: { connect: {id: folderId} },
          preview: note.content.content[0].content[0].text
        },
        select: {
          id: true,
        }
      })
    )

    const savedNotes = await Promise.all(requests)
    return NextResponse.json({
      success: true,
      savedNotes
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}
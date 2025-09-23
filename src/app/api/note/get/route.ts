import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message,
  });
}

export async function POST(req: Request) {
  try {
    const {
      noteId,
    }: {
      noteId: string;
    } = await req.json();
    if (!noteId)
      return errorResponse(
        "Something went wrong. can't be found selected note, please try again."
      );
    
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: {
        content: true,
        title: true,
        folderId: true,
        id: true,
        createdAt: true,
      }
    })

    if(!note) errorResponse("Note can't be found.")
    
    return NextResponse.json({
      success: true,
      note
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}

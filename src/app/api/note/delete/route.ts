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
    const { noteId }: { noteId: string } = await req.json();
    if(!noteId) return errorResponse("Make sure you click the delete button while a note is selected.”")

    const note = await prisma.note.delete({
      where: {id: noteId},
      select: {id: true}
    })
    if(!note) return errorResponse("Something went wrong. please try again")

    return NextResponse.json({
      success: true,
      noteId: note.id
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}

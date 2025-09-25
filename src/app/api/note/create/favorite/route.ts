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
      userId,
      noteId,
    }: {
      userId: string;
      noteId: string;
    } = await req.json();
    if(!userId || !noteId) return errorResponse("Something went wrong. please try again.")

    const favorite = await prisma.favorite.create({
      data: {
        noteId,
        user: { connect: { id: userId } }
      },
      select: {
        noteId: true,
      }
    })

    if(!favorite) return errorResponse("Something went wrong. please try again.")
    return NextResponse.json({
      success: true,
      favoriteId: favorite.noteId
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}

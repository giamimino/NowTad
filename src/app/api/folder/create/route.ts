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
    const { title, userId }: { title: string, userId: string } = await req.json()
    if(!title.trim()) return errorResponse("Title Field is required.")
    if(!userId) return errorResponse("User is required")

    const folder = await prisma.folder.create({
      data: {
        title,
        user: { connect: { id: userId } }
      },
      select: {
        id: true,
      }
    })

    if(!folder) return errorResponse("Something went wrong. Folder can't be created")

    return NextResponse.json({
      success: true,
      folder: {
        id: folder.id,
        title,
      }
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}
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
    const {id, userId}: {id: string, userId: string} = await req.json()
    if(!id || !userId) return errorResponse("Something went wrong. please delete folder again")
    

    const folder = await prisma.folder.delete({
      where: {id, userId},
      select: { id: true }
    }) 

    if(!folder) return errorResponse("Something went wrong. please delete folder again")

    return NextResponse.json({
      success: true,
      folderId: folder.id
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}
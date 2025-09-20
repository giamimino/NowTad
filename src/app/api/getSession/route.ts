import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function GET() {
  try {
    const session = await auth()

    const folders = await prisma.folder.findMany({
      where: { userId: session?.user?.id },
      select: {
        title: true,
        id: true,
      } 
    })

    return NextResponse.json({
      success: true,
      session: {
        ...session?.user,
        folders
      }
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}
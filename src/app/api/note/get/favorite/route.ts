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
    const { userId }: { userId: string } = await req.json();
    if (!userId)
      return errorResponse("Something went wrong. please try again.");
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: {
        id: true,
        noteId: true,
      },
    });

    if (!favorites)
      return errorResponse("Something went wrong. please try again.");
    return NextResponse.json({
      success: true,
      favorites,
    });
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}

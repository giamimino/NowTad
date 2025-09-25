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
      favoriteId,
    }: {
      favoriteId: string;
    } = await req.json();
    if (!favoriteId)
      return errorResponse("Something went wrong. please try again.");

    const favorite = await prisma.favorite.delete({
      where: { noteId: favoriteId },
      select: {
        id: true,
        noteId: true,
      },
    });

    if (!favorite)
      return errorResponse("Something went wrong. please try again.");
    return NextResponse.json({
      success: true,
      favorite,
    });
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}

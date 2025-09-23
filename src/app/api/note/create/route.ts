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
    const { title, folderId }: { title: string; folderId: string } =
      await req.json();
    if (!title || !folderId)
      return errorResponse("Please select folder to create note.");

    const note = await prisma.note.create({
      data: {
        title,
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "",
                },
              ],
            },
          ],
        },
        folder: { connect: { id: folderId } },
        preview: "No content available.",
      },
      select: {
        id: true,
        preview: true,
        createdAt: true,
        updatedAt: true,
        folderId: true,
        title: true,
      },
    });

    if (!note) {
      return errorResponse("Something went wrong. Note can't be created");
    }

    return NextResponse.json({
      success: true,
      note,
    });
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.");
  }
}

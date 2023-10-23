import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const newtask = await prisma.task.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(newtask);
}

export async function PUT(request, { params }) {
  const data = await request.json();

  const updatetask = await prisma.task.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });
  return NextResponse.json(updatetask);
}

export async function DELETE(request, { params }) {
  try {
    const deletedtask = await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(deletedtask);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

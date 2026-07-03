import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        message: data.message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido correctamente",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

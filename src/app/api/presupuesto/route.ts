import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { budgetSchema } from "@/lib/schemas";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = budgetSchema.parse(body);

    await prisma.budget.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        propertyType: data.propertyType,
        rooms: data.rooms ?? null,
        bathrooms: data.bathrooms ?? null,
        squareMeters: data.squareMeters ?? null,
        description: data.description,
        budgetRange: data.budgetRange ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Presupuesto solicitado correctamente",
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

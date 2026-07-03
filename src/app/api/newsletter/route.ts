import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/schemas";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = newsletterSchema.parse(body);

    await prisma.subscriber.upsert({
      where: { email: data.email },
      update: { active: true },
      create: { email: data.email },
    });

    return NextResponse.json({
      success: true,
      message: "Suscripción correcta",
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

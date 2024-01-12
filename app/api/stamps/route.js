import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createServerComponentClient({ cookies });
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error();

    const stamps = await prisma.stamps.findMany({
      where: { usersId: user.usersId },
      include: {
        activities: {
          select: {
            color: true,
            name: true,
            icon: true,
          },
        },
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(stamps);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Something went wrong", { status: 400 });
  }
}

export async function POST(req) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw Error();

    const body = await req.json();

    const currentDate = new Date();

    const createdStamp = await prisma.stamps.create({
      data: {
        usersId: user?.id,
        time: currentDate.toISOString(),
        type: body.type,
        activitiesId: body.activitiesId,
      },
    });

    const createdStampWithId = {
      ...createdStamp,
      id: createdStamp.id,
    };

    //console.log("estamos en route:", createdStampWithId);

    await prisma.$disconnect();
    return NextResponse.json(createdStampWithId);
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    return new NextResponse("Something went wrong", { status: 400 });
  }
}

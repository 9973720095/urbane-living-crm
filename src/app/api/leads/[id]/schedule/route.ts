type Request = { json(): Promise<any> };

class PrismaClient {
  lead = {
    update: async ({ where, data }: { where: { id: string }; data: { scheduled_at?: Date } }) => {
      return { id: where.id, ...data };
    },
  };
}

const NextResponse = {
  json: (body: any, init?: { status?: number }) => ({ body, status: init?.status ?? 200 }),
};

const prisma = new PrismaClient();
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data: any = {};

  if (body.scheduled_at !== undefined && body.scheduled_at !== null) {
    const scheduledAt = new Date(body.scheduled_at);
    if (Number.isNaN(scheduledAt.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid scheduled_at" }, { status: 400 });
    }

    data.scheduled_at = scheduledAt;
  }

  await prisma.lead.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json({ ok: true });
}
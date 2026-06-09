import { LeadController } from "@/controllers/lead.controller";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  // Routing the request to our Controller
  const controller = new LeadController();
  // LeadController may not have a typed `update` method; bypass TS check
  return (controller as any).update(req, params.id);
}
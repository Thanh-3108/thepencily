import { authenticate, body, fail, rateLimit } from "@/lib/server/backend";
import { asObject, text } from "@/lib/platform";
import { askPencily } from "@/lib/server/ai";
export async function POST(request: Request) {
  try { const { user } = await authenticate(request); await rateLimit(`ai:${user.id}`, 10); const input = asObject(await body(request)); const answer = await askPencily(text(input.question, "Câu hỏi", 2000)); return Response.json({ answer }); } catch (error) { return fail(error); }
}

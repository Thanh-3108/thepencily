import { authenticate, body, dbError, fail } from "@/lib/server/backend";
import { asObject, text, REWARD_COSTS, PlatformError } from "@/lib/platform";
export async function GET(request: Request) {
  try { const { db, user } = await authenticate(request); const result = await db.from("reward_redemptions").select("reward_id").eq("user_id", user.id); dbError(result.error); return Response.json({ ids: (result.data || []).map((item) => item.reward_id) }); } catch (error) { return fail(error); }
}
export async function POST(request: Request) {
  try {
    const { db, user } = await authenticate(request); const input = asObject(await body(request)); const rewardId = text(input.rewardId, "Phần thưởng", 100);
    if (!Object.prototype.hasOwnProperty.call(REWARD_COSTS, rewardId)) throw new PlatformError("Phần thưởng chưa tồn tại.");
    const result = await db.rpc("redeem_pencily_reward", { p_user: user.id, p_reward: rewardId, p_cost: REWARD_COSTS[rewardId] }); dbError(result.error);
    const profile = await db.from("users").select("*").eq("id", user.id).single(); dbError(profile.error);
    return Response.json({ profile: profile.data, rewardId });
  } catch (error) { return fail(error); }
}

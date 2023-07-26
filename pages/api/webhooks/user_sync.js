import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const { data, type } = req.body;
    const user_id = data.user_id;

    const { data: deleteUser, error: deleteError } = await supabase
        .from("user_data")
        .delete()
        .eq('id', '[object Undefined]' );

    // Handle the webhook
    if (type === "session.created") {

      const { data: upsertUser, error: upsertError } = await supabase
        .from("user_data")
        .upsert([{ id: user_id, openers_created: 0, subscription: "basic" }], {
          onConflict: ["id"],
        });

      if (upsertError) {
        console.error("Upsert failed:", upsertError.message);
        return res.status(500).json({ error: "Failed to handle webhook" });
      }

      console.log("Upsert response:", upsertUser);
      return res.status(200).json({ name: "Upserted:" + user_id });
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: "Failed to handle webhook" });
  }
}

import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

// Adds new users id to supabase when they creates their profile.
export default async function handler(req, res) {
  try {

    const { data, type } = req.body;

    // Handle the webhook
    if (type === "user.created") {
        
        const { data: insertUser, error: insertError } = await 
            supabase.from("user_data").insert([{ id: data.id, openers_created: 0, subscription: "basic" }]);

        if (insertError) {
            console.error("Insert failed:", insertError.message);
            return res.status(500).json({ error: "Failed to handle webhook" });
        }

        return res.status(200).json({ name: "Inserted:" + data.id });
    }

  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: "Failed to handle webhook" });
  }
}

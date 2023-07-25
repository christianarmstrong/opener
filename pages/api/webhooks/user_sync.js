import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const { data, type } = req.body;
    res.status(200).json({ name: "Got the webhook" });

    const user_id = data.user_id;

    // Handle the webhook
    if (type === "session.created") {
        useEffect(() => {
            const upsertUser = async () => {
                const {data, error} = await supabase.from("user_data").select();
                if (error) {
                    console.error("Upsert failed:", error.message);
                } else {
                    console.log("Upsert response:", data);
                }
            }
        })
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: "Failed to handle webhook" });
  }
}

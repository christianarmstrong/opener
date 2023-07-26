import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  try {

    const { data, type } = req.body;
    res.status(200).json({ name: "Got the webhook" });
    console.log("Type of event: ", type)
    const user_id = data.user_id;
    
    
    const { data, error } = await supabase
      .from('user_data')
      .insert([
        { id: '123456', openers_created: '0', subscription: 'basic' },
      ])
      .select()


    console.log(data)

    // Define the upsertUser function outside the if block
    const upsertUser = async () => {
      try {
        const { data: responseData, error } = await supabase.from("user_data").select();
        if (error) {
          console.error("Upsert failed:", error.message);
          return null;
        } else {
          console.log("Upsert response:", responseData);
          return responseData;
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
      }
    };

    // Handle the webhook
    if (type === "session.created") {
      const result = await upsertUser(); // Call the function to get the result
      console.log("result of upsertUser", result); // Log the result
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: "Failed to handle webhook" });
  }
}

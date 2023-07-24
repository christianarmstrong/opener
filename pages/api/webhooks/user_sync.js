
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import bodyParser from 'body-parser';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,

);

const jsonParser = bodyParser.json();

export default async function handler(req, res) {
    try {
      console.log(req.body);
      const { data, type } = req.body;
      console.log("Updating database with", data.id);
      res.status(200).json({ name: 'Got the webhook' });
  
      const user_id = data.id;
  
      // Handle the webhook
      if (type === 'session.created') {
        await supabase.from('user_data').upsert({ id: user_id });
      }
    } catch (error) {
      console.error("Error handling webhook:", error);
      return res.status(500).json({ error: "Failed to handle webhook" });
    }
}



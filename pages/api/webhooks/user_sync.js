
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,

);






export default async function handler(req, res) {


    console.log(req.body)
    const { data, type } = req.body
    console.log("Updating database with", data.email_addresses[0].email_address)
    console.log("Updating database with", data.id)
    console.log(type)
    res.status(200).json({ name: 'Got the webhook' });


    const user_id = data.id
    const user_email = data.email_addresses[0].email_address


    // Handle the webhook
    if (type === 'session.created') {
        await supabase.from('user_data').upsert({ id: user_id });
    }
    return null;
}




import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,

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
    if (type === 'user.created' || type === 'user.updated') {
        return await supabase.from('users').upsert({ id: user_id, email: user_email });
    }
    return null;
}

/*


export const updateUser = ({ user_id, user_email }) => {
    const [error, setError] = useState(null);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchCurrentOpeners = async () => {
            try {
                await supabase.from('users').upsert({ id: user_id, email: user_email });

            } catch (error) {
                setError(error);
            }
        };
        fetchCurrentOpeners();
    }, [user_id, user_email]);

    if (error) {
        console.log('error');
        return null;
    }
    return null;
}; */

import { getSession } from "better-auth/api";
import { cookies } from "next/headers";
import { env } from "../env";


const auth_api = env.API_AUTH_URL;

export const userServices = {
    getSession: async function (cookieHeader?: string) {
        try {
            let cookieStr = cookieHeader;
            if (!cookieStr) {
                const cookieStore = await cookies();
                cookieStr = cookieStore.toString();
            }
            
            const result = await fetch(`${auth_api}/get-session`, {
                headers: {
                    Cookie: cookieStr || ""
                },
                cache: "no-store",
            });

            // যদি রেসপন্স ঠিক না থাকে (যেমন ৪০১ বা ৪-৪)
            if (!result.ok) {
                return { data: null, error: "Unauthorized" };
            }

            const session = await result.json();

            // শুধু null চেক না করে, সেশন অবজেক্টের ভেতর ইউজার আছে কি না দেখুন
            if (!session || !session.user) { 
                return { data: null, error: "Session is Missing" };
            }
            
            return { data: session, error: null };
        }
        catch(err) {
            console.log("Fetch Error:", err);
            return { data: null, error: "Connection error" };
        }
    }
}
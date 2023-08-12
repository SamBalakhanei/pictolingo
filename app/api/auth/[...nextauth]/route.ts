import { authConfig } from "../../../../lib/auth";
import NextAuth from "next-auth/next";
import { getServerSession } from "next-auth/next";

const handler = NextAuth(authConfig);

export async function getUserEmail(){
    const session = await getServerSession(authConfig);
    return session?.user?.email
}
export async function getUserName(){
    const session = await getServerSession(authConfig);
    return session?.user?.name
}


export {handler as GET, handler as POST };
'use server'

import { Token } from "@/type/auth";
import { NextRequest, NextResponse } from "next/server";

export async function Register(email:string,password:string) {
    const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({"email":email,"password":password}),
        });

    return response.status
    //token
}

export async function Login(email:string,password:string) {
    const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"email":email,"password":password}),
    });

    const token:Token = await response.json()

    const toclient = NextResponse.json({ message: "OK" });
    toclient.cookies.set("token",token.token)
    return response.status
    
}
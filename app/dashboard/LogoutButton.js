"use client"

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
    return (
        <button
        
                    onClick={() => signOut({ callbackUrl: "/" })}
                    variant="destructive"
                >
                    Logout
        </button>
    )
}
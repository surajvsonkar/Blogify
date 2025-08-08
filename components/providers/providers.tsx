"use client"
import React from "react";
import {SessionProvider} from "next-auth/react"


interface providersProps {
    children: React.ReactNode;
    session?: any
}

export default function Providers({ children, session }: providersProps):React.ReactNode {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}
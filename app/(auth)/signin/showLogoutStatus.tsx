'use client'

import { useSearchParams } from 'next/navigation'
import SessionStatusSnackbar from "@/app/components/SessionStatusSnackbar";
import React from "react";

export default function ShowLogoutStatus() {
    const searchParams = useSearchParams()

    const getLogout = searchParams.get('logout') || '';
    const isLoggingOut = getLogout === 'true';


    return <>{
        isLoggingOut &&
        <SessionStatusSnackbar
            isOpen={isLoggingOut}
            message="You've been logged out"
        />
    }</>
}
"use client";
import {signIn} from "next-auth/react";
import { Button } from '@/uikit/Button';
import {BsDiscord} from 'react-icons/bs';

export default function login() {
    return (
        <div>
            <Button onClick={() => signIn('discord')} title='connect to discord'>
                <BsDiscord size={20} />
            </Button>
        </div>
    );
}

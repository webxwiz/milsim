"use client";
import {signIn} from "next-auth/react";
import { Button } from '@/uikit/Button';
import {BsDiscord} from 'react-icons/bs';

export default function login() {
    return (
        <div style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
            <Button onClick={() => signIn('discord')} title='Login with discord'>
                <BsDiscord size={20} />
            </Button>
        </div>
    );
}

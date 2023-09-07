'use client'
import Link from 'next/link'
import { BsDiscord } from 'react-icons/bs'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import { Button } from '@/uikit/Button';
import { signIn, useSession } from "next-auth/react"
import { useSearchParams } from 'next/navigation'

export default function index() {  
  const searchParams = useSearchParams()
 
  const code = searchParams.get('code')
  console.log(code)
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href='/'>
          <Image alt='' src={'/svg/logo.svg'} width={317} height={41} />
        </Link>
        <div className={styles.menu}>
          <Link className={styles.title} href={'/'}>
            Home
          </Link>
          <Link className={styles.title} href={'/events'}>
            Events
          </Link>
          <Link className={styles.title} href={'#'}>
            Discord
          </Link>
          <Button onClick={() => signIn()} title='connect to discord'>
            <BsDiscord size={20} />
          </Button>
        </div>
      </nav>
    </header>
  );
};
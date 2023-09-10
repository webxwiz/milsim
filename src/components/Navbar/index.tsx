'use client'
import Link from 'next/link'
import { BsDiscord } from 'react-icons/bs'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import { Button } from '@/uikit/Button';
import { signIn, signOut, useSession } from "next-auth/react"
import { Loading } from '@/uikit/Loading'
import { useEffect, useState } from 'react'

export default function index() {
  const { data: session, status } = useSession()

  const [openMenu, setOpenMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
      const updateScreenWidth = () => {
          setScreenWidth(window.innerWidth)
      }

      updateScreenWidth()

      window.addEventListener('resize', updateScreenWidth)
  
      return () => {
      window.removeEventListener('resize', updateScreenWidth)
      }
  }, [])

  const toggleMenu = () => setOpenMenu(!openMenu)

  const isSmallScreen = screenWidth <= 768

  const showMenu = isSmallScreen ? openMenu : true

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href='/'>
          <Image alt='' src={'/svg/logo.svg'} width={317} height={41} className={styles.logo} />
        </Link>
        {showMenu && <div className={styles.menu}>
          <Link className={styles.title} href={'/'}>
            Home
          </Link>
          <Link className={styles.title} href={''}>
            Events
          </Link>
          <Link className={styles.title} href={''}>
            Discord
          </Link>
          {session?.user ? (
            <p onClick={() => signOut()} className={styles.title}>
              Logout
            </p>
          ) : (
            <div className={styles.discordConnect}>
              <Button onClick={signIn} title='connect to discord'>
                <BsDiscord size={20} />
              </Button>
            </div>
          )}
        </div>}
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <Image alt='' src={'/svg/menu.svg'} width={24} height={29} />
        </div>
      </nav>
    </header>
  );
};
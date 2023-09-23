'use client'
import Image from 'next/image'
import { BsDiscord } from 'react-icons/bs'
import Cookies from 'js-cookie'

import styles from './Footer.module.scss'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { SAVE_USER } from '@/apollo/mutations/request'
import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'

export default function Footer() {
    const { data: session, status } = useSession()

    const [saveUser] = useMutation(SAVE_USER)

    useEffect(() => {
      if (session?.user && Cookies.get('token') === undefined) {
        saveUser({
          variables: {
            discordId: session?.user?.id,
            name: session?.user?.name
          }
        }).then(data => {
          Cookies.set('token', data?.data?.saveUser?.token)
        })
      }
    }, [session])

    const webXwizLink = 'https://webxwiz.com'
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapFooter}>
                <div className={styles.logos}>
                    <Image alt='' src={'/svg/milsimacademy.svg'} width={172} height={54} className={styles.logo1} />
                    <Image alt='' src={'/svg/squadhub.svg'} width={128} height={54} className={styles.logo2} />
                </div>
                <div className={styles.links}>
                    <BsDiscord size={24} />
                    <Link className={styles.title} href={'/'}>
                        Home
                    </Link>
                    <Link className={styles.title} href={'#'}>
                        Events
                    </Link>
                    <Link className={styles.title} href={'#'}>
                        <p onClick={() => signIn('discord')}>Discord</p>
                    </Link>
                </div>
            </div>
            <div className={styles.footerInfo}>
                <p>© 2023 MilSim. Created by <a target='_blank' className={styles.link} href={webXwizLink}>WebXwiz</a></p>
                <p>Privacy Policy and Terms of Use</p>
            </div>
        </footer>
    )
}
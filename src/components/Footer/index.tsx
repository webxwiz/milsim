import Image from 'next/image'
import { BsDiscord } from 'react-icons/bs'

import styles from './Footer.module.scss'
import Link from 'next/link'

export default function index() {
    const webXwizLink = 'https://webxwiz.com'
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapFooter}>
                <div className={styles.logos}>
                    <Image alt='' src={'/svg/milsimacademy.svg'} width={172} height={54} />
                    <Image alt='' src={'/svg/squadhub.svg'} width={128} height={54} />
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
                        Discord
                    </Link>
                    <Link className={styles.title} href={'#'}>
                        Connect
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
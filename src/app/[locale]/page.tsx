'use client'

import Image from 'next/image'
import { animateScroll as scroll } from 'react-scroll'
import { useTranslations } from 'next-intl'

import { Button } from '@/uikit/Button'
import { AboutAny } from '@/uikit/AboutAny'
import { Event } from '@/uikit/Event'
import { PastEvent } from '@/uikit/PastEvent'
import { Slider } from '@/uikit/Slider'

import styles from "../Home.module.scss"
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_EVENTS } from '@/apollo/queries/request'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useEffect } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"
import Cookies from 'js-cookie'
import { SAVE_USER } from '@/apollo/mutations/request'

const infoData = [
  {
    id: 11,
    title: 'HOW IT WORKS',
    description: 'Lorem ipsum dolor sit amet',
    iconUrl: '/svg/helmet.svg'
  },
  {
    id: 22,
    title: 'WHAT IT TAKES',
    description: 'what’s required To Join A Platoon',
    iconUrl: '/svg/engineer.svg'
  },
  {
    id: 33,
    title: 'HOW TO JOIN',
    description: 'Lorem ipsum dolor sit amet',
    iconUrl: '/svg/token.svg'
  },
  {
    id: 44,
    title: 'BOOTCAMP',
    description: 'Basic Training in the Bootcamp',
    iconUrl: '/svg/boots.svg'
  },
  {
    id: 45,
    title: 'ABOUT US',
    description: 'All About MilSim Academy',
    iconUrl: '/svg/UAFlag.svg'
  },
]

const footerData = [
  {
    id: 12345,
    url: '/svg/helmet.svg',
    style: 'title',
    title: 'how it works',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 42342,
    style: 'orangeTitle',
    url: '/svg/engineer.svg',
    title: 'what it takes',
    description: 'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 423413,
    style: 'title',
    url: '/svg/token.svg',
    title: 'how to join',
    description: 'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 13414,
    style: 'orangeTitle',
    url: '/svg/boots.svg',
    title: 'bootcamp',
    description: 'Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 4425,
    style: 'title',
    url: '/svg/UAFlag.svg',
    title: 'about us',
    description: 'Lorem 5 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
]

export default function Home() {
  const [saveUser] = useMutation(SAVE_USER)
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('Index');

  const { data: eventsData } = useQuery(GET_ALL_EVENTS)

  const allEvents = eventsData?.getAllEvents || []

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      })
    }
  };

  useEffect(() => {
    if (session?.user && Cookies.get('token') === undefined) {
      saveUser({
        variables: {
          discordId: session?.user?.id
        }
      }).then(data => Cookies.set('token', data?.data?.saveUser?.token))
    }
  }, [session])

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.adaptiveBackground}>
          <div className={styles.headerInfo}>
            <p className={styles.headerBigTitle}>{t('title')}</p>
            <p className={styles.hdDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia.
            </p>
            <div className={styles.facts}>
              <div>
                <Image alt='' src={'/svg/team.svg'} width={58} height={32} />
                <p>Teamwork</p>
              </div>
              <div>
                <Image alt='' src={'/svg/walkieTalkie.svg'} width={20} height={47} />
                <p>Communication</p>
              </div>
              <div>
                <Image alt='' src={'/svg/shoulderStraps.svg'} width={35} height={36} />
                <p>Discipline</p>
              </div>
            </div>
            <div className={styles.footerItems}>
              <div className={styles.headerEvent}>
              <Link style={{textDecoration: "none", color: "white"}} href={'/#events'}>
                <p>select an event</p>
                </Link>
              </div>
              {session?.user ? (
            <p onClick={() => {
              Cookies.remove('token')
              signOut()
            }} className={styles.title}>
              Logout
            </p>
          ) : (
            <div className={styles.discordConnect}>
              <Button onClick={signIn} title='Connect'>
              </Button>
            </div>
          )}
              {/* <Button title='Connect' /> */}
            </div>
          </div>
        </div>
        <div className={styles.rectangle} />
      </div>
      <div className={styles.blocksWrap}>
        <div className={styles.blocksInfo}>
          {infoData.map(e => (
            <AboutAny
              key={e.id}
              title={e.title}
              description={e.description}
              onClick={() => scrollToSection('footerInfo')}
            >
              <Image
                alt=''
                src={e.iconUrl}
                width={41}
                height={41}
              />
            </AboutAny>
          ))}
        </div>
      </div>
      <div className={styles.invertRectangle} />
      <div className={styles.allEvents} id='events'>
        <div className={styles.adaptiveBackground}>
          <div className={styles.eventTitle}>
            <p className={styles.bigTitle}>All Events</p>
          </div>
          <div className={styles.eventItems}>
          <Slider>
            {allEvents?.map(e => (
                <Event
                  key={e._id}
                  title={e.name}
                  description={e.description}
                  url={e.image}
                  onClick={() => router.push('/event?id=' + e._id)}
                />
            ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className={styles.pastEvents}>
        <p className={styles.bigTitle}>Past Events</p>
        <div className={styles.pastEventItems}>
          {allEvents.map(e => (
            <PastEvent
              key={e._id}
              id={e._id}
              title={e.name}
              date={e.date}
              url={e.url}
            />
          ))}
        </div>
      </div>
      <div className={styles.footer} id='footerInfo'>
        {footerData.map(e => (
          <div key={e.id}>
            <div className={styles.footerItem}>
              <Image alt='' src={e.url} width={41} height={41} />
              <p className={styles[e.style]}>{e.title}</p>
            </div>
            <p className={styles.footerDescription}>
              {e.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
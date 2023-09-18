'use client'

import Image from 'next/image'
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

export default function Home() {
  const [saveUser] = useMutation(SAVE_USER)
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslations('Home')

  const infoData = [
    {
      id: 11,
      title: t('infoData.title1'),
      description: t('infoData.description1'),
      iconUrl: '/svg/helmet.svg'
    },
    {
      id: 22,
      title: t('infoData.title2'),
      description: t('infoData.description2'),
      iconUrl: '/svg/engineer.svg'
    },
    {
      id: 33,
      title: t('infoData.title3'),
      description: t('infoData.description3'),
      iconUrl: '/svg/token.svg'
    },
    {
      id: 44,
      title: t('infoData.title4'),
      description: t('infoData.description4'),
      iconUrl: '/svg/boots.svg'
    },
    {
      id: 45,
      title: t('infoData.title5'),
      description: t('infoData.description5'),
      iconUrl: '/svg/UAFlag.svg'
    },
  ]
  
  const footerData = [
    {
      id: 12345,
      url: '/svg/helmet.svg',
      style: 'title',
      title: t('infoData.title1'),
      description: t('infoData.fullInfo')
    },
    {
      id: 42342,
      style: 'orangeTitle',
      url: '/svg/engineer.svg',
      title: t('infoData.title2'),
      description: t('infoData.fullInfo2')
    },
    {
      id: 423413,
      style: 'title',
      url: '/svg/token.svg',
      title: t('infoData.title3'),
      description: t('infoData.fullInfo3')
    },
    {
      id: 13414,
      style: 'orangeTitle',
      url: '/svg/boots.svg',
      title: t('infoData.title4'),
      description: t('infoData.fullInfo4')
    },
    {
      id: 4425,
      style: 'title',
      url: '/svg/UAFlag.svg',
      title: t('infoData.title5'),
      description: t('infoData.fullInfo5')
    },
  ]

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
  console.log(session?.user?.id)
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
             {t('description')}
            </p>
            <div className={styles.facts}>
              <div>
                <Image alt='' src={'/svg/team.svg'} width={58} height={32} />
                <p>{t('teamwork')}</p>
              </div>
              <div>
                <Image alt='' src={'/svg/walkieTalkie.svg'} width={20} height={47} />
                <p>{t('communication')}</p>
              </div>
              <div>
                <Image alt='' src={'/svg/shoulderStraps.svg'} width={35} height={36} />
                <p>{t('discipline')}</p>
              </div>
            </div>
            <div className={styles.footerItems}>
              <div className={styles.headerEvent}>
              <Link style={{textDecoration: "none", color: "white"}} href={'/#events'}>
                <p>{t('selectEvent')}t</p>
                </Link>
              </div>
              {session?.user ? (
            <p onClick={() => {
              Cookies.remove('token')
              signOut()
            }} className={styles.title}>
                {t('logout')}
              </p>
            ) : (
              <div className={styles.discordConnect}>
                <Button onClick={signIn} title={t('connect')} />
              </div>
            )}
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
            <p className={styles.bigTitle}>{t('allEvents')}</p>
          </div>
          <div className={styles.eventItems}>
          <Slider>
            {allEvents?.filter((pastEvent) => new Date(pastEvent.date) >= new Date()).map(e => (
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
        <p className={styles.bigTitle}>{t('pastEvents')}</p>
        <div className={styles.pastEventItems}>
          {allEvents.filter((pastEvent) => new Date(pastEvent.date) <= new Date()).map(e => (
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
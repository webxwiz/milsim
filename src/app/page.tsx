'use client'

import Image from 'next/image'
import { Link, animateScroll as scroll } from 'react-scroll'

import { Button } from '@/uikit/Button'
import { AboutAny } from '@/uikit/AboutAny'
import { Event } from '@/uikit/Event'
import { PastEvent } from '@/uikit/PastEvent'
import { Slider } from '@/uikit/Slider'

import styles from './Home.module.scss'

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

const allEventsData = [
  {
    id: 111,
    title: 'Lorem ipsum 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg1.webp'
  },
  {
    id: 222,
    title: 'Lorem ipsum 2',
    description: 'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg2.webp'
  },
  {
    id: 333,
    title: 'Lorem ipsum 3',
    description: 'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg3.webp'
  },
  {
    id: 444,
    title: 'Lorem ipsum 4',
    description: 'Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg2.webp'
  },
]

const pastEventsData = [
  {
    id: 1111,
    title: 'Lorem Ipsum Dolor Sit 1',
    date: '24 aug 2023',
    url: '/images/pastEvent1.webp'
  },
  {
    id: 2222,
    title: 'Lorem Ipsum Dolor Sit 2',
    date: '25 sep 2023',
    url: '/images/pastEvent1.webp'
  },
  {
    id: 3333,
    title: 'Lorem Ipsum Dolor Sit 3',
    date: '26 oct 2023',
    url: '/images/pastEvent1.webp'
  },
  {
    id: 4444,
    title: 'Lorem Ipsum Dolor Sit 4',
    date: '27 aug 2023',
    url: '/images/pastEvent1.webp'
  }
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
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)

    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      })
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.adaptiveBackground}>
          <div className={styles.headerInfo}>
            <p className={styles.headerBigTitle}>ENList NOW!</p>
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
                <p>select an event</p>
              </div>
              <Button title='Connect' />
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
      <div className={styles.allEvents}>
        <div className={styles.adaptiveBackground}>
          <div className={styles.eventTitle}>
            <p className={styles.bigTitle}>All Events</p>
          </div>
          <div className={styles.eventItems}>
          <Slider>
            {allEventsData.map(e => (
                <Event
                  key={e.id}
                  title={e.title}
                  description={e.description}
                  url={e.url}
                />
            ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className={styles.pastEvents}>
        <p className={styles.bigTitle}>Past Events</p>
        <div className={styles.pastEventItems}>
          {pastEventsData.map(e => (
            <PastEvent
              key={e.id}
              id={e.id}
              title={e.title}
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
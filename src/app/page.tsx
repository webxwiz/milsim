import { Button } from '@/uikit/Button'
import styles from './Home.module.scss'
import Image from 'next/image'
import { AboutAny } from '@/uikit/AboutAny'
import { Event } from '@/uikit/Event'
import { PastEvent } from '@/uikit/PastEvent'

const infoData = [
  {
    id: 1,
    title: 'HOW IT WORKS',
    description: 'Lorem ipsum dolor sit amet',
    iconUrl: '/svg/helmet.svg'
  },
  {
    id: 2,
    title: 'WHAT IT TAKES',
    description: 'what’s required To Join A Platoon',
    iconUrl: '/svg/engineer.svg'
  },
  {
    id: 3,
    title: 'HOW TO JOIN',
    description: 'Lorem ipsum dolor sit amet',
    iconUrl: '/svg/token.svg'
  },
  {
    id: 4,
    title: 'BOOTCAMP',
    description: 'Basic Training in the Bootcamp',
    iconUrl: '/svg/boots.svg'
  },
  {
    id: 4,
    title: 'ABOUT US',
    description: 'All About MilSim Academy',
    iconUrl: '/svg/UAFlag.svg'
  },
]

const allEventsData = [
  {
    id: 1,
    title: 'Lorem ipsum 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg1.webp'
  },
  {
    id: 2,
    title: 'Lorem ipsum 2',
    description: 'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg2.webp'
  },
  {
    id: 3,
    title: 'Lorem ipsum 3',
    description: 'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg3.webp'
  },
  {
    id: 4,
    title: 'Lorem ipsum 4',
    description: 'Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris.',
    url: '/images/eventImg2.webp'
  },
]

const pastEventsData = [
  {
    id: 1,
    title: 'Lorem Ipsum Dolor Sit 1',
    date: '24 aug 2023',
    url: '/images/pastEvent1.webp'
  },
  {
    id: 2,
    title: 'Lorem Ipsum Dolor Sit 2',
    date: '25 sep 2023',
    url: '/images/pastEvent1.webp'
  },
  {
    id: 3,
    title: 'Lorem Ipsum Dolor Sit 3',
    date: '26 oct 2023',
    url: '/images/pastEvent1.webp'
  },
  {
    id: 4,
    title: 'Lorem Ipsum Dolor Sit 4',
    date: '27 aug 2023',
    url: '/images/pastEvent1.webp'
  }
]

const footerData = [
  {
    id: 1,
    url: '/svg/helmet.svg',
    style: 'title',
    title: 'how it works',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 2,
    style: 'orangeTitle',
    url: '/svg/engineer.svg',
    title: 'what it takes',
    description: 'Lorem 2 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 3,
    style: 'title',
    url: '/svg/token.svg',
    title: 'how to join',
    description: 'Lorem 3 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 4,
    style: 'orangeTitle',
    url: '/svg/boots.svg',
    title: 'bootcamp',
    description: 'Lorem 4 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
  {
    id: 5,
    style: 'title',
    url: '/svg/UAFlag.svg',
    title: 'about us',
    description: 'Lorem 5 ipsum dolor sit amet, consectetur adipiscing elit. Integer vel ultricies mauris. Nam blandit magna eget eros consectetur lacinia. Cras ante nunc, eleifend nec malesuada id, malesuada in tellus. Integer et aliquam enim, et pulvinar nulla. Integer ligula felis, finibus nec fringilla id, accumsan eget sem.'
  },
]

export default function Home() {
  return (
    <main>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <p className={styles.bigTitle}>ENList NOW!</p>
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
        <div className={styles.rectangle} />
      </div>
      <div className={styles.blocksInfo}>
        {infoData.map(e => (
          <AboutAny
            key={e.id}
            title={e.title}
            description={e.description}
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
      <div className={styles.invertRectangle} />
      <div className={styles.allEvents}>
        <p className={styles.bigTitle}>All Events</p>
        <div className={styles.eventItems}>
          {allEventsData.map(e => (
            <Event
              key={e.id}
              title={e.title}
              description={e.description}
              url={e.url}
            />
          ))}
        </div>
      </div>
      <div className={styles.pastEvents}>
        <p className={styles.bigTitle}>Past Events</p>
        <div className={styles.pastEventItems}>
          {pastEventsData.map(e => (
            <PastEvent
              key={e.id}
              title={e.title}
              date={e.date}
              url={e.url}
            />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
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
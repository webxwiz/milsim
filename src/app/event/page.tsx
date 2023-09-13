'use client'
import Image from 'next/image'
import styles from './Event.module.scss'
import { RegisterCard } from '@/uikit/RegisterCard'
import { EditCard } from '@/uikit/RegisterCard/EditCard'
import { useRouter } from 'next/navigation'
import { EventProps } from './interface'
import { RoleType } from '@/components/EventForm/interface'

const eventData = {
    id: 'tewgwegwe',
    eventName: 'Event First',
    eventDate: '2023-09-15',
    eventDuration: '2 hours',
    eventImage: '/images/eventImg1.webp',
    eventDescription: 'Description of event :P',
    eventPlatoons: [
        {
            id: 'g2143rq',
            name: 'Platoon 1',
            color: 'red',
            image: '/images/eventsBackground.webp',
            squads: [
                {
                    id: 'bhdfbwrq',
                    name: 'Squad 1',
                    roles: [
                        { id: 'bnw', name: 'M2', count: 10 },
                        { id: '911', name: 'M5 Competition', count: 5 },
                    ],
                    },
                {
                    id: '434gewgw12314214',
                    name: 'Squad 2',
                    roles: [
                        { id: '2590', name: 'E63 AMG', count: 10 },
                        { id: 'adwe23', name: 'S COUPE', count: 1 },
                    ],
                    busyRoles: [
                        { id: 'ad1we223', name: 'S COUPE', discordId: '410430677922611200' },
                    ]
                },
                {
                    id: '525bhdfbwrq',
                    name: 'Squad 3 (!)',
                    roles: [
                        { id: 'bnw', name: 'Bentley', count: 0 },
                        { id: '911', name: 'Rolls-Royce', count: 0 },
                    ],
                    },
                {
                    id: 'ge552wgw12314214',
                    name: 'Squad 4',
                    roles: [
                        { id: '2590', name: 'Lamborghini', count: 0 },
                        { id: 'adwe23', name: 'Maserati', count: 0 },
                    ],
                    busyRoles: [
                        { id: 'ad1we223', name: 'Lamborghini', discordId: '410430677922611200' },
                    ]
                },
            ],
        },
        {
            id: 'ggwegbfnsawedsfd',
            name: 'Platoon 2',
            color: 'blue',
            image: '/images/eventImg4.webp',
            squads: [
                {
                    id: 'bgasdsdsdsd',
                    name: 'Squad 1!',
                    roles: [
                        { id: 'zmsksa', name: 'Cadillac', count: 12 },
                        { id: 'glppq', name: 'Plane', count: 6 },
                    ],
                    busyRoles: [
                        { id: 'adgssre1we223', name: 'Plane', discordId: '523634732' },
                    ]
                },
                {
                    id: 'gsdgvdsghjdh',
                    name: 'Squad 2!',
                    roles: [
                        { id: '1222', name: 'Joker', count: 0 },
                        { id: '2s112', name: 'Hello?', count: 3 },
                    ],
                },
            ],
        },
    ],
}

export default function Event(props: EventProps) {
    const router = useRouter()

    const handleRole = (id: string, role: RoleType, name: string, isRemove: boolean) => {
        if (isRemove) {
            console.log('for remove my item')
        } else if (id && role && name?.trim()) {
            console.log(34, id, role, name)
        } else {
            alert('Add data')
        }
    }

    console.log('event id for event page', props)
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p className={styles.bigOrangeTitle}>Operation: </p>
                <p className={styles.bigTitle}>
                    Freedom Area - Part 1
                </p>
            </div>
            <p className={styles.smallTitle}>Open to All - Sep 2, 2023 8:45:00 PM (GMT+3)</p>
            <Image alt='' src={eventData.eventImage} width={1015} height={568} className={styles.mapImg} />
            <p className={styles.smallTitle}>OPERATION BRIEFING:</p>
            <div className={styles.fullInfo}>
                <p className={styles.title}>I. SITUATION:</p>
                <div className={styles.list}>
                    <p className={styles.text}>1. US FORCES: After months of grueling battles with Insurgent forces in the valley and no progress to show for it, Company HQ has decided to change up the approach and is making a daring attempt to turn the tide against the rebel forces. With the help of our intelligence officers and a briefcase full of Benjamins, HQ has secured a lease on a compound from a wealthy merchant on the western side of the valley in an attempt to create a presence and provide another avenue of attack on Insurgent forces that control the central area of the valley. Our Platoon is tasked with providing security for a convoy of engineers leaving the FOB and moving west to set up the COP at the compound. Insurgent forces are highly active in the area and roadblocks, mines, and IEDs are to be expected.</p>
                    <br />
                    <p className={styles.text}>2. INS FORCES: For months, we have been testing the Americans will by attacking them at any opportunity. So far, not only have we managed to stop the infidel advance, but we have also clawed some of our lands back from under them. The friendly locals have informed us that a traitorous merchant has leased his compound to the Americans, and they plan to open a base of operations on this newly acquired land on the western side of the valley in a last-ditch effort to keep control. We cannot let this happen. Thankfully, the locals have also told us that they have seen a US logistics convoy organized at their base under the cover of darkness, and expect them to leave at daybreak. We must move quickly to stop and destroy this convoy before it reaches the compound and prevent the Americans from gaining a lifeline in the valley we have almost won back.</p>
                </div>
                <p className={styles.title}>II. MISSION:</p>
                <div className={styles.list}>
                    <p className={styles.text}>US FORCES:</p>
                    <div className={styles.list}>
                        <p className={styles.text}>a. Escort convoy west and construct a COP.</p>
                        <p className={styles.text}>b. Defend the COP from any insurgent advances.</p>
                        <p className={styles.text}>c. If Logistics Trucks are destroyed, proceed to the nearest exfil location.</p>
                    </div>
                    <p className={styles.text}>INS FORCES:</p>
                    <div className={styles.list}>
                        <p className={styles.text}>a. Ambush and destroy US Logistics Trucks</p>
                        <p className={styles.text}>b. If trucks escape, attack and destroy US COP, and eliminate all US forces.</p>
                    </div>
                </div>
            </div>
            <div className={styles.registration}>
                <p className={styles.subtitle}>Registration</p>
                <div className={styles.cards}>
                    {eventData.eventPlatoons.map(e => (
                        <div key={e.id} className={styles.eventPlatoons}>
                            <RegisterCard
                                key={e.id}
                                title={e.name}
                                data={e.squads}
                            />
                            <div
                                style={{
                                    backgroundImage: `url(${e.image})`
                                }}
                                className={styles.footer}
                            >
                                <div className={styles.items}>
                                    {e.squads.map((s, i) => (
                                        <div key={s.id}>
                                            {i === 0 && <p className={styles.squadTitle}>{e.name}</p>}
                                            <EditCard
                                                title={s.name}
                                                data={s.roles}
                                                busyRoles={s.busyRoles}
                                                squadId={s.id}
                                                handleRole={handleRole}
                                                isSelect
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
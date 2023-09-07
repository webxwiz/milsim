import Image from 'next/image'
import styles from './Event.module.scss'
import { RegisterCard } from '@/uikit/RegisterCard'
import { EditCard } from '@/uikit/RegisterCard/EditCard'

const eventData = [
    {
        id: 1,
        title: 'Platoon 1',
        data: [
            {
                id: 91,
                title: 'Squad 1',
            },
            {
                id: 92,
                title: 'Squad 2',
            },
            {
                id: 43,
                title: 'Squad 3',
            },
            {
                id: 4646,
                title: 'Squad 4',
            },
            {
                id: 7554,
                title: 'Squad 5',
            },
            {
                id: 69,
                title: 'Squad 6',
            }
        ]
    },
    {
        id: 2,
        title: 'Platoon 2',
        data: [
            {
                id: 12,
                title: 'Sniper 1',
            },
            {
                id: 232,
                title: 'Sniper 2',
            },
            {
                id: 332,
                title: 'Squad 3',
            },
            {
                id: 41,
                title: 'Squad 4',
            },
            {
                id: 51,
                title: 'Squad 5',
            },
            {
                id: 116,
                title: 'Squad 6',
            }
        ]
    }
]

const eventForEditExample = [
    {
        id: 15323,
        title: 'Platoon 1',
        data: [
            {
                id: 91,
                title: 'Squad 1',
                isEdit: false,
            },
            {
                id: 92,
                title: 'Sniper 2',
                isEdit: false,
            },
            {
                id: 43,
                title: 'Squad 3',
                isEdit: false,
            },
            {
                id: 4646,
                title: 'Squad 4',
                isEdit: true,
            },
            {
                id: 7554,
                title: 'Squad 5',
                isEdit: false,
            },
            {
                id: 69,
                title: 'Squad 6',
                isEdit: false,
            }
        ]
    },
]

export default function Event() {
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p className={styles.bigOrangeTitle}>
                    Operation:
                </p>
                <p className={styles.bigTitle}>
                    Freedom Area - Part 1
                </p>
            </div>
            <p className={styles.smallTitle}>Open to All - Sep 2, 2023 8:45:00 PM (GMT+3)</p>
            <Image alt='' src={'/images/eventImg1.webp'} width={1015} height={568} className={styles.mapImg} />
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
                    {eventData.map(e => (
                        <RegisterCard
                            key={e.id}
                            title={e.title}
                            data={e.data}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.items}>
                    {eventForEditExample.map(e => (
                        <EditCard key={e.id} title={e.title} data={e.data} />
                    ))}
                </div>
            </div>
        </div>
    )
}
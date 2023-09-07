import { PastEvent } from "@/uikit/PastEvent"
import styles from '../EventsAdmin.module.scss'
import { Button } from "@/uikit/Button"

const eventsData = [
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

export const AllEvents = () => {
    return (
        <div className={styles.main}>
            <div className={styles.events}>
                {eventsData.map(e => (
                    <PastEvent
                        key={e.id}
                        title={e.title}
                        date={e.date}
                        url={e.url}
                        isEdit
                    />
                ))}
            </div>
            <Button title='Create post' />
        </div>
    )
}
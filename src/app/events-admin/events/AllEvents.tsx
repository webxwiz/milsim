import { PastEvent } from "@/uikit/PastEvent"
import styles from '../EventsAdmin.module.scss'
import { Button } from "@/uikit/Button"
import { GET_ALL_EVENTS } from "@/apollo/queries/request"
import { useMutation, useQuery } from "@apollo/client"
import { EVENT_DELETE } from "@/apollo/mutations/request"

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
  const { data, refetch } = useQuery(GET_ALL_EVENTS)

  const [eventDelete] = useMutation(EVENT_DELETE)

  const removeModal = (id: string | number) => {
      eventDelete({
          variables: {
              id
          }
      }).then(() => refetch())
  }

    return (
        <div className={styles.main}>
            <div className={styles.events}>
                {data?.getAllEvents?.map((e) => (
                    <PastEvent
                        key={e._id}
                        id={e._id}
                        title={e.name}
                        date={e.date}
                        url={e.image}
                        eventDelete={removeModal}
                        isEdit
                    />
                ))}
            </div>
            <Button title='Create post' />
        </div>
    )
}
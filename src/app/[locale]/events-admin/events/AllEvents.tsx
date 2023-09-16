import { PastEvent } from "@/uikit/PastEvent"
import styles from '../EventsAdmin.module.scss'
import { Button } from "@/uikit/Button"
import { GET_ALL_EVENTS } from "@/apollo/queries/request"
import { useMutation, useQuery } from "@apollo/client"
import { EVENT_DELETE } from "@/apollo/mutations/request"
import Link from 'next/link'
import { useTranslations } from "next-intl"

export const AllEvents = () => {
  const { data, refetch } = useQuery(GET_ALL_EVENTS)

  const t = useTranslations('Global');

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
           <Link href="/create-event"> <Button title={t('createPost')} /></Link>
        </div>
    )
}
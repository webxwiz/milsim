'use client'
import Image from 'next/image'
import styles from './Event.module.scss'
import { RegisterCard } from '@/uikit/RegisterCard'
import { EditCard } from '@/uikit/RegisterCard/EditCard'
import { useRouter } from 'next/navigation'
import { EventProps } from './interface'
import { RoleType, SquadType } from '@/components/EventForm/interface'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ONE_EVENT } from '@/apollo/queries/request'
import { ADD_USER_TO_EVENT, REMOVE_FROM_BUSY_ROLES } from '@/apollo/mutations/request'
import { useTranslations } from 'next-intl'

export default function Event(props: EventProps) {
    const router = useRouter()

    const t = useTranslations('Event')

    const eventId = props?.searchParams?.id

    const { data: eventData, refetch } = useQuery(GET_ONE_EVENT, {
        variables: {
            id: eventId,
        }
    })

    const [addUserToEvent] = useMutation(ADD_USER_TO_EVENT)
    const [removeRoleFromBusyRoles] = useMutation(REMOVE_FROM_BUSY_ROLES)

    const handleRole = (id: string, role: RoleType, name: string, isRemove: boolean, roleId: string) => {
        if (isRemove) {
            removeRoleFromBusyRoles({
                variables: {
                    removeFromBusyRolesInput: {
                        roleId,
                        squadId: id
                      }
                }
            }).then(() => refetch())
        } else if (id && role && name?.trim()) {
            addUserToEvent({
                variables: {
                    addUserToEventInput: {
                        roleId,
                        roleName: role,
                        squadId: id,
                        playerName: name,
                    }
                }
            }).then(() => refetch()).catch(error => alert(error))
        } else {
            alert('Add data')
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p className={styles.bigOrangeTitle}>Operation: </p>
                <p className={styles.bigTitle}>
                    {eventData?.getOneEvent.name}
                </p>
            </div>
            <p className={styles.smallTitle}>{t('openToAll')} - {eventData?.getOneEvent?.date}</p>
            {/* <Image alt='' src={eventData?.image} width={1015} height={568} className={styles.mapImg} /> */}
            <p className={styles.smallTitle}>{t('operationBriefing')}</p>
            <div className={styles.fullInfo}>
                <p className={styles.title}>{t('situation')}</p>
                <div className={styles.list}>
                    <p className={styles.text}>{t('usForces')}</p>
                    <br />
                    <p className={styles.text}>{t('insForces')}</p>
                </div>
                <p className={styles.title}>{t('mission')}</p>
                <div className={styles.list}>
                    <p className={styles.text}>{t('usForces2')}</p>
                    <div className={styles.list}>
                        <p className={styles.text}>{t('ufInfo1')}</p>
                        <p className={styles.text}>{t('ufInfo2')}</p>
                        <p className={styles.text}>{t('ufInfo3')}</p>
                    </div>
                    <p className={styles.text}>{t('insForces2')}</p>
                    <div className={styles.list}>
                        <p className={styles.text}>{t('ifInfo1')}</p>
                        <p className={styles.text}>{t('ifInfo2')}</p>
                    </div>
                </div>
            </div>
            <div className={styles.registration}>
                <p className={styles.subtitle}>{t('registration')}</p>
                <div className={styles.cards}>
                    {eventData?.getOneEvent?.platoons?.map((e: any) => (
                        <div key={e._id} className={styles.eventPlatoons}>
                            <RegisterCard
                                key={e._id}
                                title={e.name}
                                data={e.squads}
                            />
                            <div
                                style={{
                                    // backgroundImage: `url(${e.image})`
                                }}
                                className={styles.footer}
                            >
                                <div className={styles.items}>
                                    {e.squads.map((s: SquadType, i: number) => (
                                        <div key={s.id}>
                                            {i === 0 && <p className={styles.squadTitle}>{e.name}</p>}
                                            <EditCard
                                                title={s.name}
                                                data={s.roles}
                                                busyRoles={s.busyRoles}
                                                squadId={s._id}
                                                handleRole={handleRole}
                                                isSelect
                                                indexId={i}
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
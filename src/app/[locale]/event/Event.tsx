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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import convertISOToCustomFormat from '@/components/customDate'
import Swal from 'sweetalert2'

export default function Event({ props }: { props: EventProps }) {
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
                        roleName: role,
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
                        // playerName: name,
                    }
                }
            }).then(() => refetch()).catch(error => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
                background: 'black',
                color: 'white'
            }))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Add data',
                text: 'Enter the form',
                background: 'black',
                color: 'white'
            })
        }
    }

    // console.log(eventData?.getOneEvent)

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <p className={styles.bigOrangeTitle}>Operation: </p>
                <p className={styles.bigTitle}>
                    {eventData?.getOneEvent?.name}
                </p>
            </div>
            <p className={styles.smallTitle}>{t('openToAll')} - {convertISOToCustomFormat(eventData?.getOneEvent?.date)}</p>
            <Image
                alt=''
                src={eventData?.getOneEvent?.image}
                width={1015}
                height={568}
                className={styles.mapImg}
                loader={({ src, width: w, quality }) => {
                    const q = quality || 75;
                    return `${src}?w=${w}&q=${q}`;
                }}
            />
            <p className={styles.smallTitle}>{t('operationBriefing')}</p>
            <div className={styles.fullInfo}>
                <div className={styles.list}>
            <ReactMarkdown
                    className={styles.text}
                    remarkPlugins={[remarkGfm]}
                  >{eventData?.getOneEvent?.description}</ReactMarkdown>
                  </div>
                {/* <p className={styles.title}>{t('situation')}</p>
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
                </div> */}
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
                            {e.squads?.[0] && <div
                                style={{
                                    backgroundImage: `url(${e.image})`,
                                    position: 'relative'
                                }}
                                className={styles.footer}
                            >
                                <Image src="/svg/platoon_strange.svg" width={50} height={42} style={{position: "absolute", right: "40px", top: "30px", boxShadow: '0px 16px 16px rgba(0, 0, 0, 0.8)'}}/>
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
                                            <br />
                                            {s?.busyRoles?.[0] && <EditCard
                                                platoonId={e.id}
                                                squadId={s.id}
                                                title={'Busy Roles'}
                                                data={s?.busyRoles}
                                                noArrow={false}
                                                isEdit={true}
                                                busyRolesForAdmin
                                                // addToWaitingList={addToWaitingList}
                                            />}
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
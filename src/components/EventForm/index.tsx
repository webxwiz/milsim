'use client'
import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Controller, useForm } from "react-hook-form";
import styles from './EventForm.module.scss'
import { RegisterCard } from '@/uikit/RegisterCard'
import { EditCard } from '@/uikit/RegisterCard/EditCard'
import { Button } from '@/uikit/Button'
import { EventFormProps, EventFormTypes } from './interface'
import { FormModal } from '@/uikit/Modal/FormModal'
import { useState } from 'react'
import { ImageUploader } from '@/uikit/ImageUploader/ImageUploader'
import { UploadedImage } from '@/uikit/ImageUploader/interface'

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
                    name: 'Squad 3',
                    roles: [
                        { id: '2590', name: 'E63 AMG', count: 8 },
                        { id: 'adwe23', name: 'S COUPE', count: 4 },
                    ],
                },
                {
                    id: '525bhdfbwrq',
                    name: 'Squad 3 (!)',
                    roles: [
                        { id: 'bnw', name: 'Bentley', count: 10 },
                        { id: '911', name: 'Rolls-Royce', count: 5 },
                    ],
                    },
                {
                    id: 'ge552wgw12314214',
                    name: 'Squad 4',
                    roles: [
                        { id: '2590', name: 'Lamborghini', count: 8 },
                        { id: 'adwe23', name: 'Maserati', count: 4 },
                    ],
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
                },
                {
                    id: 'gsdgvdsghjdh',
                    name: 'Squad 2!',
                    roles: [
                        { id: '1222', name: 'Joker', count: 9 },
                        { id: '2s112', name: 'Hello?', count: 3 },
                    ],
                },
            ],
        },
    ],
}

export const EventForm = ({ isEdit }: EventFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        getValues,
        watch,
    } = useForm<EventFormTypes>({
        defaultValues: isEdit ? eventData : {
            eventName: '',
            eventDate: '',
            eventDuration: '',
            eventImage: '',
            eventDescription: '',
            eventPlatoons: []
        },
    })
    
    const [itemId, setItemId] = useState('')
    const [editSquadId, setEditSquadId] = useState('')

    const [platoonModal, setPlatoonModal] = useState(false)
    const [squadModal, setSquadModal] = useState(false)
    const [editSquad, setEditSquad] = useState(false)

    const handlePlatoonModal = () => setPlatoonModal(!platoonModal)
    const handleSquadModal = () => setSquadModal(!squadModal)
    const handleEditSquad = () => setEditSquad(!editSquad)

    const handleEventSubmit = (event: EventFormTypes) => {
        console.log(123, event)
    }

    const handleSetImage = (image: UploadedImage[]) => {
        setValue('eventImage', image[0].preview)
    }

    const eventPlatoons = watch('eventPlatoons') || []

    const createPlatoon = (name: string, color: string | undefined, img: string) => {
        const data = {
            id: Date.now(),
            name,
            color,
            image: img,
            squads: []
        }
        setValue('eventPlatoons', [...watch('eventPlatoons'), data])
    }

    const removePlatoon = (id: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').filter(e => e.id !== id))
    }

    const onChangeNameSquad = (id: string, squadId: string, name: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map(platoon => {
            if (platoon.id === id) {
                platoon.squads.map(squad => {
                    if (squad.id === squadId) {
                        squad.name = name
                    }

                    return squad
                })
            }

            return platoon
        }))
    }

    const onChangeNameRole = (id: string, squadId: string, roleId: string, value: string, type: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map(platoon => {
            if (platoon.id === id) {
                platoon.squads.map(squad => {
                    if (squad.id === squadId) {
                        squad.roles.map(role => {
                            if (type === 'name') {
                                if (role.id === roleId) {
                                    role.name = value
                                }
                            }

                            if (type === 'count') {
                                if (role.id === roleId) {
                                    role.count = value
                                }
                            }

                            return role
                        })
                    }
                    return squad
                })
            }

            return platoon
        }))
    }

    const removeSquadRole = (id: string, squadId: string, roleId: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map(platoon => {
            if (platoon.id === id) {
                platoon.squads.map(squad => {
                    if (squad.id === squadId) {
                        squad.roles = squad.roles.filter(role => role.id !== roleId)
                    }
                    return squad
                })
            }
            return platoon
        }))
    }

    const createSquad = (name: string, roles) => {
        watch('eventPlatoons').find(e => e.id === itemId).squads.push({
            id: Date.now(),
            name,
            roles,
        })
    }

    const removeSquad = (platoonId: string, squadId: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map(platoon => {
            if (platoon.id === platoonId) {
                platoon.squads = platoon.squads.filter(squad => squad.id !== squadId)
            }

            return platoon
        }))
    }

    const onEditSquad = (id: string, squadId: string, squadName: string, roles: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map(platoon => {
            if (platoon.id === id) {
                platoon.squads.map(squad => {
                    if (squad.id === squadId) {
                        squad.name = squadName
                        squad.roles = roles
                    }

                    return squad
                })
            }

            return platoon
        }))
        
    }
    const watchData = watch && watch('eventPlatoons').find(p => p.id === itemId)?.squads?.find(s => s.id === editSquadId)

    return (
        <div className={styles.event}>
            <FormModal isOpen={platoonModal} onSubmit={createPlatoon} mode='platoon' onClose={handlePlatoonModal}  />
            <FormModal isOpen={squadModal} onSubmit={createSquad} itemId={itemId} mode='squad' onClose={handleSquadModal} />

            <FormModal isOpen={editSquad} isEdit watchData={watchData} itemId={itemId} squadId={editSquadId} onSubmit={onEditSquad} mode='squad' onClose={handleEditSquad} />

            <p className={styles.title}>{isEdit ? 'Change' : 'NEW'} EVENT NAME</p>
            <input {...register('eventName', { required: true })} className={styles.input} />
            <p className={styles.title}>{isEdit ? 'Change' : 'NEW'} Date</p>
            <input {...register('eventDate', { required: true })} className={styles.input} />
            <p className={styles.title}>Duration of the event</p>
            <input {...register('eventDuration', { required: true })} className={styles.input} />
            <p className={styles.title}>{isEdit ? 'Change' : 'FEATURE'} IMAGE</p>
            <ImageUploader
                defaultImage={{ preview: watch('eventImage')}}
                onSubmit={handleSetImage}
                isBigSingle
            />
            <p className={styles.title}>{isEdit ? 'Change' : 'Write'} DESCRIPTION </p>
            <textarea {...register('eventDescription', { required: true })} className={styles.textArea}></textarea>
            <p className={styles.title}>{isEdit ? 'Change' : 'Add'} Platoon</p>
            <div>
                <div className={styles.cards}>
                    <div onClick={handlePlatoonModal} className={styles.addPlatoon}>
                        <FaPlus size={34} />
                    </div>
                    {eventPlatoons.map((e) => (
                        <div key={e.id}>
                            <RegisterCard
                                platoonId={e.id}
                                title={e.name}
                                data={e.squads}
                                onChangeName={onChangeNameSquad}
                                removeSquad={removeSquad}
                                removePlatoon={removePlatoon}
                                addSquad={() => {
                                    setItemId(e.id)
                                    handleSquadModal()
                                }}
                                isEdit
                            />
                            {e.squads?.length >= 1 && <div
                                style={{
                                    backgroundImage: `url(${e.image})`
                                }}
                                className={styles.footer}
                            >
                                <div className={styles.items}>
                                    {e.squads?.map((squad, i) => (
                                        <div key={squad.id}>
                                            {i === 0 && <p className={styles.squadTitle}>
                                                {e.name}
                                            </p>}
                                            <EditCard
                                                platoonId={e.id}
                                                squadId={squad.id}
                                                title={squad.name}
                                                data={squad.roles}
                                                isEdit={true}
                                                onEdit={() => {
                                                    setEditSquadId(squad.id)
                                                    setItemId(e.id)
                                                    handleEditSquad()
                                                }}
                                                removeSquadRole={removeSquadRole}
                                                removeSquad={removeSquad}
                                                onChangeNameRole={onChangeNameRole}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.footerButtons}>
                <Button title='Confirm' onClick={handleSubmit(handleEventSubmit)} />
                <Button title='Cancel' isCancel />
            </div>
        </div>
    )
}
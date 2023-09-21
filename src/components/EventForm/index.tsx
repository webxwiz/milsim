'use client'

import { FaPlus } from 'react-icons/fa'
import { useForm } from "react-hook-form";
import styles from './EventForm.module.scss'
import { RegisterCard } from '@/uikit/RegisterCard'
import { EditCard } from '@/uikit/RegisterCard/EditCard'
import { Button } from '@/uikit/Button'
import { EventFormProps, EventFormTypes, PlatoonType, RoleType, RolesType, SquadType } from './interface'
import { FormModal } from '@/uikit/Modal/FormModal'
import { useEffect, useRef, useState } from 'react'
import { ImageUploader } from '@/uikit/ImageUploader/ImageUploader'
import { UploadedImage } from '@/uikit/ImageUploader/interface'
import { useMutation, useQuery } from '@apollo/client';
import { CHANGE_EVENT, CREATE_EVENT } from '@/apollo/mutations/request';
import { GET_ONE_EVENT, GET_USER } from '@/apollo/queries/request';
import TextareaAutosize from 'react-textarea-autosize';
import Image from "next/image"
import { useTranslations } from 'next-intl'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import instans from '@/config/axios';
 
export const EventForm = ({ id, isEdit }: EventFormProps) => {
    const router = useRouter()
    
    const [text, setText] = useState("")
    const { data: admin } = useQuery(GET_USER)
    const { data: eventData } = useQuery(GET_ONE_EVENT, {
        variables: {
            id,
        }
    })

    const t = useTranslations('EventForm');

    const [createEvent, { error }] = useMutation(CREATE_EVENT)
    const [changeEvent, { error: changeEventError }] = useMutation(CHANGE_EVENT)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
    } = useForm<EventFormTypes | any>({
        defaultValues: isEdit ? eventData : {
            eventName: '',
            eventDate: '',
            eventDuration: '',
            eventImage: '',
            eventDescription: '',
            eventPlatoons: []
        },
    })

    // useEffect(() => {
    //     if (admin && admin?.getUserByToken?.role !== 'ADMIN' || Cookies.get('token') === undefined) {
    //         router.push('/')
    //     }
    // }, [admin])

    useEffect(() => {
        if (eventData) {
            reset({
                eventName: eventData.getOneEvent.name,
                eventDate: new Date(eventData.getOneEvent.date).toLocaleDateString(),
                eventDescription: eventData.getOneEvent.description,
                eventDuration: eventData.getOneEvent.duration,
                eventImage: eventData.getOneEvent.image,
                eventPlatoons: eventData.getOneEvent.platoons.map((p: PlatoonType) => ({
                    id: p._id,
                    color: p.color,
                    image: p.image,
                    name: p.name,
                    squads: p.squads.map(s => ({
                        id: s._id,
                        name: s.name,
                        roles: s.roles.map(r => ({
                            id: r._id,
                            count: Number(r.count),
                            name: r.name,
                        })),
                        busyRoles: s.busyRoles.map(b => ({
                            id: b._id,
                            discordId: b.discordId,
                            role: b.role,
                            playerName: b.playerName
                        }))
                    }))
                }))
            })
        }
    }, [eventData])
    
    const [itemId, setItemId] = useState('')
    const [editSquadId, setEditSquadId] = useState('')

    const [platoonModal, setPlatoonModal] = useState(false)
    const [squadModal, setSquadModal] = useState(false)
    const [editSquad, setEditSquad] = useState(false)

    const handlePlatoonModal = () => setPlatoonModal(!platoonModal)
    const handleSquadModal = () => setSquadModal(!squadModal)
    const handleEditSquad = () => setEditSquad(!editSquad)

    const handleEventSubmit = (event: EventFormTypes) => {
        if (isEdit) {
            changeEvent({
                variables: {
                    updateEventInput: {
                        _id: id,
                        data: {
                            date: new Date(event.eventDate),
                            description: text,
                            duration: Number(event.eventDuration),
                            image: previewImage,
                            name: event.eventName,
                            platoons: event.eventPlatoons.map(p => ({
                                color: p.color,
                                image: p.image,
                                name: p.name,
                                squads: p.squads.map(s => ({
                                    name: s.name,
                                    roles: s.roles.map(r => ({
                                        count: Number(r.count),
                                        name: r.name,
                                    }))
                                }))
                            }))
                        }
                    }
                }
            })
        } else {
            createEvent({
                variables: {
                    createEventInput: {
                        date: String(event.eventDate),
                        description: text,
                        duration: Number(event.eventDuration),
                        image: previewImage,
                        name: event.eventName,
                        platoons: event.eventPlatoons.map(p => ({
                            color: p.color,
                            image: p.image,
                            name: p.name,
                            squads: p.squads.map(s => ({
                                name: s.name,
                                roles: s.roles.map(r => ({
                                    count: Number(r.count),
                                    name: r.name,
                                }))
                            }))
                        }))
                    }
                }
            })
        }
        if (isEdit ? changeEventError : error) {
            console.log(error)
            alert('Error!')
        } else {
            if (!isEdit) {
                reset()
            }
        }
    }

    // const handleSetImage = (image: UploadedImage[]) => {
    //     setValue('eventImage', image[0].preview)
    // }

    const [previewImage, setPreviewImage] = useState("")

    const handleSetImage = async (image: UploadedImage[]) => {
        if (!image[0].file) return
        const formData = new FormData()

        formData.append('image', image[0].file)

        instans.post('image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            // window.location.reload()
            setPreviewImage(res.data.imageURL)
        }).catch((err) => {
            alert("Eror")
            console.log(error)
        })
      };

      console.log(previewImage)

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
        setValue('eventPlatoons', watch('eventPlatoons').filter((e: PlatoonType) => e.id !== id))
    }

    const onChangeNameSquad = (id: string, squadId: string, name: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map((platoon: PlatoonType) => {
            if (platoon.id === id) {
                platoon.squads.map((squad: SquadType) => {
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
        setValue('eventPlatoons', watch('eventPlatoons').map((platoon: PlatoonType) => {
            if (platoon.id === id) {
                platoon.squads.map((squad: SquadType) => {
                    if (squad.id === squadId) {
                        squad.roles.map((role: RoleType) => {
                            if (type === 'name') {
                                if (role.id === roleId) {
                                    role.name = value
                                }
                            }

                            if (type === 'count') {
                                if (role.id === roleId) {
                                    role.count = Number(value)
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

    const removeFromBusyRole = (id: string, squadId: string, roleId: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map((platoon: PlatoonType) => {
            if (platoon.id === id) {
                platoon.squads.map((squad: SquadType) => {
                    if (squad.id === squadId) {
                        squad.busyRoles = squad.busyRoles.filter(b => b.id !== roleId)
                    }
                    return squad
                })
            }

            return platoon
        }))
    }

    const removeSquadRole = (id: string, squadId: string, roleId: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map((platoon: PlatoonType) => {
            if (platoon.id === id) {
                platoon.squads.map((squad: SquadType) => {
                    if (squad.id === squadId) {
                        squad.roles = squad.roles.filter((role: RoleType) => role.id !== roleId)
                    }
                    return squad
                })
            }
            return platoon
        }))
    }

    const createSquad = (name: string, roles: RoleType[]) => {
        watch('eventPlatoons').find((e: PlatoonType) => e.id === itemId).squads.push({
            id: Date.now(),
            name,
            roles,
        })
    }

    const removeSquad = (platoonId: string, squadId: string) => {
        setValue('eventPlatoons', watch('eventPlatoons').map((platoon: PlatoonType) => {
            if (platoon.id === platoonId) {
                platoon.squads = platoon.squads.filter((squad: SquadType) => squad.id !== squadId)
            }

            return platoon
        }))
    }

    const onEditSquad = (id: string, squadId: string, squadName: string, roles: RoleType[]) => {
        setValue('eventPlatoons', watch('eventPlatoons').map((platoon: PlatoonType) => {
            if (platoon.id === id) {
                platoon.squads.map((squad: SquadType) => {
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
    const watchData = watch && watch('eventPlatoons')?.find((p: PlatoonType) => p.id === itemId)?.squads?.find((s: SquadType) => s.id === editSquadId)
    const handleKeyDown = (event: any) => {
        // Проверяем, была ли нажата клавиша Enter (код клавиши Enter - 13)
        if (event.keyCode === 13) {
          event.preventDefault(); // Отменяем стандартное поведение Enter (переход на новую строку)
          const textarea = event.target;
          const caretPosition = textarea.selectionStart;
          const currentValue = textarea.value;
    
          // Добавляем два перевода строки (пустые строки) на место курсора
          const newTextValue =
            currentValue.substring(0, caretPosition) +
            '\n\n' +
            currentValue.substring(caretPosition);
    
          setText(newTextValue);
        }
      };
      
    const contextMenuRef = useRef(null);
    const textareaRef = useRef(null);
    const handleMenuItemClick = (action: string) => {
  const textarea = textareaRef.current;
  const text = textarea?.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (action === 'addHash') {
    const newText = `${text.substring(0, start)}# ${text.substring(start, end)}${text.substring(end)}`;
    textarea.value = newText;
    setText(newText);
  }

  if (action === 'add2Hash') {
    const newText = `${text.substring(0, start)}## ${text.substring(start, end)}${text.substring(end)}`;
    textarea.value = newText;
    setText(newText);
  }

  if (action === 'addImage') {
    const selectedText = text.substring(start, end);
    const imageMarkdown = `![Alt Text](${selectedText})`;
    const newText = `${text.substring(0, start)}${imageMarkdown}${text.substring(end)}`;
    textarea.value = newText;
    setText(newText);
  }

  if (action === 'addBold') {
    const selectedText = text.substring(start, end);
    const boldMarkdown = `**${selectedText}**`;
    const newText = `${text.substring(0, start)}${boldMarkdown}${text.substring(end)}`;
    textarea.value = newText;
    setText(newText);
  }

  if (action === 'addItalic') {
    const selectedText = text.substring(start, end);
    const italicMarkdown = `*${selectedText}*`;
    const newText = `${text.substring(0, start)}${italicMarkdown}${text.substring(end)}`;
    textarea.value = newText;
    setText(newText);
  }

  if (action === 'addStrikethrough') {
    const selectedText = text.substring(start, end);
    const strikethroughMarkdown = `~~${selectedText}~~`;
    const newText = `${text.substring(0, start)}${strikethroughMarkdown}${text.substring(end)}`;
    textarea.value = newText;
    setText(newText);
  }

  if (action === 'addLink') {
    const selectedText = text.substring(start, end);
    const linkURL = prompt('Введите URL ссылки:');
    if (linkURL) {
      const linkMarkdown = `[${selectedText}](${linkURL})`;
      const newText = `${text.substring(0, start)}${linkMarkdown}${text.substring(end)}`;
      textarea.value = newText;
      setText(newText);
    }
  }

  const menu = contextMenuRef.current;
  // menu.style.display = 'none';
};

    // const removeFromBusyRole = (platoonid: string, squadId: string, roleId: string) => {
    //     console.log(1234567, squadId, roleId)
    // }

    return (
        <div className={styles.event}>
            <FormModal isOpen={platoonModal} onSubmit={createPlatoon} mode='platoon' onClose={handlePlatoonModal}  />
            <FormModal isOpen={squadModal} onSubmit={createSquad} itemId={itemId} mode='squad' onClose={handleSquadModal} />

            <FormModal isOpen={editSquad} isEdit watchData={watchData} itemId={itemId} squadId={editSquadId} onSubmit={onEditSquad} mode='squad' onClose={handleEditSquad} />

            <p className={styles.title}>{isEdit ? t('change') : t('new')} {t('eventName')}</p>
            <input {...register('eventName', { required: true })} className={styles.input} />
            <p className={styles.title}>{isEdit ? t('change') : t('new')} {t('date')}</p>
            <DatePicker
                value={watch('eventDate')}
                onChange={(date) => setValue('eventDate', date)}
                className={styles.input}
            />
            <p className={styles.title}>{t('eventDuration')}</p>
            <input {...register('eventDuration', { required: true })} className={styles.input} />
            <p className={styles.title}>{isEdit ? t('change') : t('feature')} {t('image')}</p>
            <ImageUploader
                defaultImage={watch('eventImage') ? { preview: watch('eventImage')} : undefined}
                onSubmit={handleSetImage}
                isBigSingle
            />
            <p className={styles.title}>{isEdit ? t('change') : t('write')} {t('description')} </p>
            <div className={styles.changeIcon}>
            <Image src="/B.svg" alt="B" width="12" height="25" onClick={() => handleMenuItemClick('addBold')} />
      <Image src="/I.svg" alt="B" width="14" height="14" onClick={() => handleMenuItemClick('addItalic')} />
      </div>
            <TextareaAutosize
     onChange={(e) => setText(e.target.value)}
     onKeyDown={handleKeyDown} // Добавляем обработчик события onKeyDown
     placeholder={t('description').toLowerCase() + '...'}
     ref={textareaRef}
     value={text}
     className={styles.textArea}
    //  onMouseUp={handleMouseUp}
    //  {...register('eventDescription', { required: true })}
/>

      {/* <button className='s_button' type='button'  onClick={() => handleMenuItemClick('addItalic')}>Italic</button> */}
            {/* <textarea {...register('eventDescription', { required: true })} className={styles.textArea}></textarea> */}
            <p className={styles.title}>{isEdit ? t('change') : t('add')} {t('platoon')}</p>
            <div>
                <div className={styles.cards}>
                    <div onClick={handlePlatoonModal} className={styles.addPlatoon}>
                        <FaPlus size={34} />
                    </div>
                    {eventPlatoons.map((e: PlatoonType) => (
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
                                    {e.squads?.map((squad: SquadType, i: number) => (
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
                                            <br />
                                            {squad?.busyRoles?.[0] && <EditCard
                                                platoonId={e.id}
                                                squadId={squad.id}
                                                title={'Busy Roles'}
                                                data={squad?.busyRoles}
                                                isEdit={true}
                                                busyRolesForAdmin

                                                removeSquadRole={removeFromBusyRole}
                                            />}
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.footerButtons}>
                <Button title={t('confirm')} onClick={handleSubmit(handleEventSubmit)} />
                <Button title={t('cancel')} isCancel />
            </div>
        </div>
    )
}
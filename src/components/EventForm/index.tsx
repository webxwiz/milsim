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
import { GET_ONE_EVENT } from '@/apollo/queries/request';
import TextareaAutosize from 'react-textarea-autosize';

export const EventForm = ({ id, isEdit }: EventFormProps) => {
    const [text, setText] = useState("")
    const { data: eventData } = useQuery(GET_ONE_EVENT, {
        variables: {
            id,
        }
    })

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
                            description: event.eventDescription,
                            duration: Number(event.eventDuration),
                            image: event.eventImage,
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
                        date: new Date(event.eventDate),
                        description: event.eventDescription,
                        duration: Number(event.eventDuration),
                        image: event.eventImage,
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

    const handleSetImage = async (image: UploadedImage[]) => {
        const formData = new FormData();
        // console.log(image[0].file)
        formData.append('file', image[0].file);
        console.log(formData)
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_URL}/api/image`, {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          console.log('Изображение успешно загружено');
        } else {
          console.error('Ошибка при загрузке изображения');
        }
      };

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
    const handleKeyDown = (event) => {
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

const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    setSelectedText(selectedText);

    const textarea = textareaRef.current;
    const { scrollTop, scrollLeft, offsetTop, offsetLeft } = textarea;
    const { clientX, clientY } = selection.getRangeAt(0).getBoundingClientRect();

    const menu = contextMenuRef.current;
    menu.style.top = `${clientY - offsetTop + scrollTop}px`;
    menu.style.left = `${clientX - offsetLeft + scrollLeft}px`;
    // menu.style.display = 'block';
  };

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
                defaultImage={watch('eventImage') ? { preview: watch('eventImage')} : undefined}
                onSubmit={handleSetImage}
                isBigSingle
            />
            <p className={styles.title}>{isEdit ? 'Change' : 'Write'} DESCRIPTION </p>
            <TextareaAutosize
     onChange={(e) => setText(e.target.value)}
     onKeyDown={handleKeyDown} // Добавляем обработчик события onKeyDown
     placeholder="Description ..."
     ref={textareaRef}
     value={text}
     className={styles.textArea}
    //  onMouseUp={handleMouseUp}
    //  {...register('eventDescription', { required: true })}
/>
      <button className='s_button' type='button'  onClick={() => handleMenuItemClick('addBold')}>Bold</button>
      <button className='s_button' type='button'  onClick={() => handleMenuItemClick('addItalic')}>Italic</button>
      <button className='s_button' type='button'  onClick={() => handleMenuItemClick('addStrikethrough')}>Strikethrough</button>
            <textarea {...register('eventDescription', { required: true })} className={styles.textArea}></textarea>
            <p className={styles.title}>{isEdit ? 'Change' : 'Add'} Platoon</p>
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
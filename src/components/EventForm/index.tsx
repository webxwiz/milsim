'use client'
import { FaPlus } from 'react-icons/fa'
import styles from './EventForm.module.scss'
import { RegisterCard } from '@/uikit/RegisterCard'
import { EditCard } from '@/uikit/RegisterCard/EditCard'
import { Button } from '@/uikit/Button'
import { EventFormProps } from './interface'
import { FormModal } from '@/uikit/Modal/FormModal'
import { useState } from 'react'
import { ImageUploader } from '@/uikit/ImageUploader/ImageUploader'

const platoons = [
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
]

const editPlatoons = [
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
                isEdit: false,
            },
        ]
    },
]

export const EventForm = ({ isEdit }: EventFormProps) => {
    const [platoonModal, setPlatoonModal] = useState(false)

    const handlePlatoonModal = () => setPlatoonModal(!platoonModal)

    return (
        <div className={styles.event}>
            <FormModal isOpen={platoonModal} onClose={handlePlatoonModal} />
            <p className={styles.title}>{isEdit ? 'Change' : 'NEW'} EVENT NAME</p>
            <input className={styles.input} />
            <p className={styles.title}>{isEdit ? 'Change' : 'NEW'} Date</p>
            <input className={styles.input} />
            <p className={styles.title}>Duration of the event</p>
            <input className={styles.input} />
            <p className={styles.title}>{isEdit ? 'Change' : 'FEATURE'} IMAGE</p>
            <ImageUploader />
            <p className={styles.title}>{isEdit ? 'Change' : 'Write'} DESCRIPTION </p>
            <textarea className={styles.textArea}></textarea>
            {isEdit && <div className={styles.inlineButtons}>
                <Button title='Confirm' />
                <Button title='Cancel' isCancel />
            </div>}
            <p className={styles.title}>{isEdit ? 'Change' : 'Add'} Platoon</p>
            <div className={styles.platoons}>
                <div className={styles.cards}>
                    {platoons.map(e => (
                        <RegisterCard
                            key={e.id}
                            title={e.title}
                            data={e.data}
                            isEdit
                        />
                    ))}
                </div>
                <div onClick={handlePlatoonModal} className={styles.addPlatoon}>
                    <FaPlus size={34} />
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.items}>
                    {editPlatoons.map(e => (
                        <EditCard
                            key={e.id}
                            title={e.title}
                            data={e.data}
                            isEdit={isEdit}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.footerButtons}>
                {!isEdit && <Button title='Confirm' />}
                {!isEdit && <Button title='Cancel' isCancel />}
            </div>
        </div>
    )
}
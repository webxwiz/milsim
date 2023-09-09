import Image from "next/image"
import { RiCloseCircleFill } from 'react-icons/ri'

import { PastEventProps } from "./interface"
import styles from './PastEvent.module.scss'
import { useState } from "react"
import { Modal } from "../Modal"

export const PastEvent = ({ title, date, url, isEdit }: PastEventProps) => {
    const [openModal, setOpenModal] = useState(false)

    const handleModal = () => setOpenModal(!openModal)

    const button = isEdit ? 'Edit' : 'Read'
    return (
        <div className={styles.pastEvent}>
            <Modal isOpen={openModal} onClose={handleModal} />
            <div className={styles.event}>
                <div className={styles.imageBlock}>
                    <Image alt='' src={url} width={272} height={120} className={styles.image} />
                    <div className={styles.operation}>
                        <p>operation:</p>
                        <p>{title}</p>
                    </div>
                </div>
                <div className={styles.date}>
                    <p className={styles.dateText}>{date}</p>
                    <div className={styles.button}>
                        <p>{button}</p>
                    </div>
                    {isEdit && (
                        <div className={styles.close} onClick={handleModal}>
                            <RiCloseCircleFill size={37} color={'rgba(193, 87, 73, 1)'} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
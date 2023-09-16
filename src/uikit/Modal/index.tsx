import React from 'react'
import { IoClose } from 'react-icons/io5'

import { ModalProps } from './interface'
import styles from './Modal.module.scss'

export const Modal = ({
    isOpen,
    onClose,
    onSubmit,
}: ModalProps) => {

    const handleSubmit = () => {
        onSubmit && onSubmit()
        onClose()
    }

  return isOpen && (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <IoClose onClick={onClose} size={30} className={styles.close} />
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>Please confirm</p>
                    <p className={styles.bigTitle}>Are you sure?</p>
                    <div className={styles.buttons}>
                        <button onClick={handleSubmit}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
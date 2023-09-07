import React from 'react'
import { IoClose } from 'react-icons/io5'

import { ModalProps } from './interface'
import styles from './Modal.module.scss'

export const Modal = ({
    isOpen,
    onClose,
}: ModalProps) => {


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
                        <button>Yes</button>
                        <button>Nes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
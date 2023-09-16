import React from 'react'
import { IoClose } from 'react-icons/io5'

import { ModalProps } from './interface'
import styles from './Modal.module.scss'
import { useTranslations } from 'next-intl'

export const Modal = ({
    isOpen,
    onClose,
    onSubmit,
}: ModalProps) => {
    const t = useTranslations('ConfirmModal')

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
                    <p className={styles.title}>{t('confirm')}</p>
                    <p className={styles.bigTitle}>{t('sure')}</p>
                    <div className={styles.buttons}>
                        <button onClick={handleSubmit}>{t('yes')}</button>
                        <button onClick={onClose}>{t('no')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
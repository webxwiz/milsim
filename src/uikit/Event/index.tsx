import Image from "next/image"

import { EventProps } from "./interface"
import styles from './Event.module.scss'
import { useTranslations } from "next-intl"

export const Event = ({
    url,
    title,
    description,
    onClick,
}: EventProps) => {
    const t = useTranslations('Global')

    return (
        <div className={styles.event}>
            <Image
                alt=''
                src={url}
                width={295}
                height={297}
                onError={(e) => {
                    e.target.onerror = null; // Отключаем обработчик ошибки, чтобы избежать бесконечных вызовов
                    e.target.src = '/images/eventImg1.webp' // Путь к изображению по умолчанию
                }}
                className={styles.image}
            />
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.button} onClick={onClick}>
                <p>{t('more')}</p>
            </div>
        </div>
    )
}
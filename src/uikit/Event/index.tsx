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
            {/* <Image alt='' defaultValue={'/images/eventImg1.webp'} src={url} width={295} height={297} className={styles.image} /> */}
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.button} onClick={onClick}>
                <p>{t('more')}</p>
            </div>
        </div>
    )
}
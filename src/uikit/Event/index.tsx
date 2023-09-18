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
    let width = 200
    let quality = 80

       
    return (
        <div className={styles.event}>
            <Image 
                className={styles.image}
                width={50}
                height={50}
                src={url}
                loader={({ src, width: w, quality }) => {
                    const q = quality || 75;
                    return `${url}?w=${w}&q=${q}`;
                }}
                alt={title}
            />
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.button} onClick={onClick}>
                <p>{t('more')}</p>
            </div>
        </div>
    )
}

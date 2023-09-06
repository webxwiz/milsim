import Image from "next/image"

import { EventProps } from "./interface"
import styles from './Event.module.scss'

export const Event = ({
    url,
    title,
    description,
}: EventProps) => {
    return (
        <div className={styles.event}>
            <Image alt='' src={url} width={295} height={297} />
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.button}>
                <p>More</p>
            </div>
        </div>
    )
}
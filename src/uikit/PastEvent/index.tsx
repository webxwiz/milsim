import Image from "next/image"
import { RiCloseCircleFill } from 'react-icons/ri'

import { PastEventProps } from "./interface"
import styles from './PastEvent.module.scss'

export const PastEvent = ({ title, date, url, isEdit }: PastEventProps) => {
    const button = isEdit ? 'Edit' : 'Read'
    return (
        <div className={styles.pastEvent}>
            <div className={styles.event}>
                <div className={styles.imageBlock}>
                    <Image alt='' src={url} width={272} height={120} />
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
                    {isEdit && <RiCloseCircleFill size={37} color={'rgba(193, 87, 73, 1)'} />}
                </div>
            </div>
        </div>
    )
}
import { RiCloseCircleFill } from 'react-icons/ri'

import { RegisterCardProps } from './interface'
import styles from './RegisterCard.module.scss'

export const RegisterCard = ({ title, data, isEdit }: RegisterCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.remove}>
                <RiCloseCircleFill size={29} color={'rgba(193, 87, 73, 1)'} />
            </div>
            <p className={styles.title}>{title}</p>
            <div className={styles.items}>
                {data.map(e => (
                    <div className={styles.dataItem} key={e.id}>
                        <div>{e.title}</div>
                        <RiCloseCircleFill size={22} color={'rgba(193, 87, 73, 1)'} />
                    </div>
                ))}
            </div>
            {isEdit && (
                <div className={styles.button}>
                    <p>add squad</p>
                </div>
            )}
        </div>
    )
}
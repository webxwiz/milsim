import { RiCloseCircleFill } from 'react-icons/ri'

import { RegisterCardProps } from './interface'
import styles from './RegisterCard.module.scss'

export const EditCard = ({ title, data, isEdit }: RegisterCardProps) => {
    return (
        <div>
            <p className={styles.editTitle}>{title}</p>
            <div className={styles.editCard}>
                <div className={styles.remove}>
                    <RiCloseCircleFill size={29} color={'rgba(193, 87, 73, 1)'} />
                </div>
                <p className={styles.title}>Squad 3:</p>
                <div className={styles.editItems}>
                    {data.map(e => (
                        <div className={styles.dataItem} key={e.id}>
                            <div>{e.title}</div>
                            {e.isEdit && <RiCloseCircleFill size={22} color={'rgba(193, 87, 73, 1)'} />}
                        </div>
                    ))}
                </div>
                {isEdit && (
                    <div className={styles.button}>
                        <p>Edit</p>
                    </div>
                )}
            </div>
        </div>
    )
}
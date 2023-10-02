import { RiCloseCircleFill } from 'react-icons/ri'

import { RegisterCardProps } from './interface'
import styles from './RegisterCard.module.scss'
import { useTranslations } from 'next-intl'

export const RegisterCard = ({ platoonId, title, data, isEdit, addSquad, removeSquad, removePlatoon, onChangeName, changePlatoon, color, image }: RegisterCardProps) => {
    const t = useTranslations('Event')

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                {isEdit && <div className={styles.remove}>
                    <RiCloseCircleFill onClick={() => removePlatoon && removePlatoon(platoonId as string)} size={29} color={'rgba(193, 87, 73, 1)'} />
                </div>}
            </div>
            <div className={styles.items}>
                {data?.map((e: any) => (
                    <div className={styles.dataItem} key={e.id}>
                        {isEdit ?
                        <input defaultValue={e.name} onChange={(event) => onChangeName && onChangeName(platoonId as string, e.id, event.target.value)} className={styles.input} />
                        : <div>{e.name}</div>}
                        {isEdit && <RiCloseCircleFill onClick={() => removeSquad && removeSquad(platoonId as string, e.id)} size={22} color={'rgba(193, 87, 73, 1)'} />}
                    </div>
                ))}
            </div>
            {isEdit && (
                <>
                <div onClick={addSquad} className={styles.button}>
                    <p>{t('addSquad')}</p>
                </div>
                <br />
                 <div onClick={() => changePlatoon(platoonId, title, color, image)} className={styles.button}>
                 <p>Change Platoon</p>
             </div>
             </>
            )}
        </div>
    )
}
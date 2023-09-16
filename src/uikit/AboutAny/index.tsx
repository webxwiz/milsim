import { HiMiniArrowRight } from 'react-icons/hi2'

import styles from './AboutAny.module.scss'
import { AboutAnyProps } from './interface'
import { useTranslations } from 'next-intl';

export const AboutAny = ({ title, description, onClick, children }: AboutAnyProps) => {
    const t = useTranslations('AboutAny');

    return (
        <div className={styles.block}>
            {children}
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div onClick={onClick} className={styles.button}>
                <p>{t('readMore')}</p>
                <HiMiniArrowRight size={20} />
            </div>
        </div>
    )
}
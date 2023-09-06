import { HiMiniArrowRight } from 'react-icons/hi2'

import styles from './AboutAny.module.scss'
import { AboutAnyProps } from './interface'

export const AboutAny = ({ title, description, children }: AboutAnyProps) => {
    return (
        <div className={styles.block}>
            {children}
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.button}>
                <p>Read more</p>
                <HiMiniArrowRight size={20} />
            </div>
        </div>
    )
}
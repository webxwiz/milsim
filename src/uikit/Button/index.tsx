import styles from './Button.module.scss'
import { ButtonProps } from './interface'

export const Button = ({
    title,
    onClick,
    children,
}: ButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <div className={styles.title}>
                <p>{title}</p>
                {children}
            </div>
        </button>
    )
}
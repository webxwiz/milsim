import styles from './Loading.module.scss'

export const Loading = () => {
  return (
    <div className={styles.loadingIconContainer}>
        <div className={styles.blurredBackground}></div>
        <div className={styles.loadingSpinner}>
        </div>
    </div>
  )
}
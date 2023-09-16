'use client'

import { useTranslations } from 'next-intl'
import styles from './Terms.module.scss'
import { termsPage } from '@/metadata/metadata'

const metadata = termsPage

export default function Terms() {
    const t = useTranslations('Terms')

    return (
        <div className={styles.terms}>
            <p className={styles.title}>{t('title')}</p>
            <p className={styles.subtitle}>{t('subtitle')}</p>
            <br />
            <p className={styles.text}>
                {t('text1')}
            </p>
            <p className={styles.text}>{t('text2')}</p>
            <br />
            <p className={styles.text}>
            {t('text3')}
            </p>
            <br />
            <p className={styles.text}>
            {t('text4')}
            </p>
            <br />
            <p className={styles.text}>
            {t('text5')}
            </p>
            <br />
            <p className={styles.text}>
            {t('text6')}
            </p>
            <br />
            <p className={styles.text}>
            {t('text7')}
            </p>
            <br />
            <p className={styles.text}>
            {t('text8')}
            </p>
            <br />
            <p className={styles.text}>
            {t('text9')}
            </p>
            <br /><br />
            <p className={styles.subtitle}>{t('playWithUs')}</p>
            <p className={styles.text}>{t('text10')}</p>
            <br />
            <p className={styles.text}>
            {t('squad')}
            </p>
            <p className={styles.text}>
            {t('text11')}
            </p>
            <p className={styles.text}>
            {t('text12')}
            </p>
            <p className={styles.text}>
            {t('text13')}
            </p>
            <br />
            <p className={styles.text}>{t('reforge')}</p>
            <p className={styles.text}>{t('text14')}</p>
            <p className={styles.text}>{t('text15')}</p>
            <br />
            <p className={styles.text}>{t('arma')}</p>
            <p className={styles.text}>
            {t('text16')}
            </p>
            <br />
            <p className={styles.subtitle}>{t('text17')}</p>
            <p className={styles.text}>{t('text18')}</p>
            <p className={styles.text}>{t('text19')}</p>
            <br />
            <p className={styles.subtitle}>{t('text20')}</p>
            <p className={styles.text}>
            {t('text21')}
            </p>
            <br />
            <p className={styles.subtitle}>
            {t('text22')}
            </p>
            <p className={styles.text}>
            {t('text23')}
            </p>
            <br />
            <p className={styles.text}>{t('text24')}</p>
            <br />
            <p className={styles.text}>{t('text25')}</p>
            <br />
            <p className={styles.text}>{t('text26')}</p>
            <br />
            <p className={styles.text}>{t('text27')}</p>
            <br />
            <p className={styles.text}>{t('text28')}</p>
            <br />
            <p className={styles.text}>{t('text29')}</p>
            <br />
            <p className={styles.text}>{t('text30')}</p>
            <br />
            <p className={styles.text}>{t('text31')}</p>
            <br />
            <p className={styles.text}>{t('text32')}</p>
            <br />
            <p className={styles.text}>{t('text33')}</p>
            <br />
            <p className={styles.text}>{t('text34')}</p>
            <br />
            <p className={styles.text}>{t('text35')}</p>
            <br />
            <p className={styles.text}>{t('text36')}</p>
            <br />
            <p className={styles.text}>{t('text37')}</p>
        </div>
    )
}
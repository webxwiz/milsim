'use client'
import { useState } from 'react'
import styles from './EventsAdmin.module.scss'
import { AllEvents } from './events/AllEvents'
import { steps } from './steps'
import { useTranslations } from 'next-intl'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/apollo/queries/request'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function EventsAdmin() {
    const { data } = useQuery(GET_USER)

    const router = useRouter()

    const [step, setStep] = useState(1)

    const t = useTranslations('Global')

    const handleChangeStep = (step: number) => setStep(step)
    
    if (data && data?.getUserByToken?.role !== 'ADMIN' || Cookies.get('token') === undefined) {
        router.push('/')
    }

    return (
        <div className={styles.header}>
            <p className={styles.title}>{t('events')}</p>
            <div className={styles.steps}>
                {steps.map(e => (
                    <p
                        key={e.id}
                        onClick={() => handleChangeStep(e.id)}
                        className={step === e.id ? styles.activeStep :styles.stepTitle}
                    >
                        {e.step}
                    </p>
                ))}
            </div>
            {step === 1 && <AllEvents />}
        </div>
    )
}
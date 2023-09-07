'use client'
import { useState } from 'react'
import styles from './EventsAdmin.module.scss'
import { AllEvents } from './events/AllEvents'
import { steps } from './steps'

export default function EventsAdmin() {
    const [step, setStep] = useState(1)

    const handleChangeStep = (step: number) => setStep(step)

    return (
        <div>
            <div className={styles.header}>
                <p className={styles.title}>Events</p>
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
        </div>
    )
}
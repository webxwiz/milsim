import React, { Fragment, useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { AiOutlineWarning } from 'react-icons/ai'
import { RiCloseCircleFill } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa'
import { ColorResult, SketchPicker } from 'react-color'

import { ModalProps } from './interface'
import styles from './Modal.module.scss'
import { Button } from '../Button'
import { ImageUploader } from '../ImageUploader/ImageUploader'
import { UploadedImage } from '../ImageUploader/interface'
import { RoleType } from '@/components/EventForm/interface'

export const FormModal = ({
    isOpen,
    onClose,
    mode: formMode,
    isEdit,
    onSubmit,
    itemId,
    squadId,
    watchData
}: ModalProps) => {
    
    const [platoonName, setPlatoonName] = useState('')
    const [activeColor, setActiveColor] = useState<string>()
    const [image, setImage] = useState<UploadedImage[]>([])
    
    const [mode, setMode] = useState(formMode)

    const [squadName, setSquadName] = useState('')
    const [roleName, setRoleName] = useState('')
    const [roleCount, setRoleCount] = useState('')

    const [roles, setRoles] = useState<RoleType[]>([])

    useEffect(() => {
        if (watchData?.name) {
            setSquadName(watchData?.name)
            setRoles(watchData?.roles)
        }
    }, [watchData, isOpen])

    const handleClose = () => {
        setActiveColor('#')
        setMode(formMode)
        setImage([])
        setPlatoonName('')
        setSquadName('')
        setRoleName('')
        setRoleCount('')
        setRoles([])
        onClose()
    }

    const onNext = () => {
        switch (mode) {
            case 'platoon': {
                onSubmit && onSubmit(platoonName, activeColor, image[0].preview)
                return handleClose()
            }
            case 'squad': {
                onSubmit && isEdit ? onSubmit(itemId, squadId, squadName, roles) : onSubmit(squadName, roles)
                return handleClose()
            }
            case 'role': {
                setRoles([...roles, {
                    id: Date.now(),
                    name: roleName,
                    count: roleCount,
                }])
                setRoleName('')
                setRoleCount('')
                return setMode('squad')
            }
        }
    }

    const addSquade = () => {
        setMode('role')
    }

    const removeRoleFromSquad = (id: string | number) => {
        setRoles(roles.filter((e: RoleType) => e.id !== id))
    }

    const handleSetActiveColor = (color: ColorResult) => {
        setActiveColor(color.hex)
    }

    const isPlatoon = mode === 'platoon'
    const isSquad = mode === 'squad'
    const mainTitlePreffix = isEdit ? 'EDIT' : 'NEW'
    const mainTitle = isPlatoon ? `${mainTitlePreffix} PLATOON` : isSquad ? `${mainTitlePreffix} SQUAD NAME` : `${mainTitlePreffix} ROLE`
    const inputTitle = isPlatoon ? 'Platoon Name' : isSquad ? 'Squad Name' : 'Role Name'

    const inputValue = isPlatoon ? platoonName : isSquad ? squadName : roleName
    const inputChange = isPlatoon ? setPlatoonName : isSquad ? setSquadName : setRoleName

    return isOpen && (
        <div className={styles.modal}>
            <div className={styles.formModalContent}>
                <div className={styles.formHeader}>
                    <p className={styles.formModalTitle}>{mainTitle}</p>
                    <IoClose onClick={handleClose} size={30} className={styles.close} />
                </div>
                <div className={styles.formContent}>
                    <p className={styles.subtitle}>{inputTitle}</p>
                    <input className={styles.input} value={inputValue} onChange={(e) => inputChange(e.target.value)} />
                    {mode === 'role' && (
                        <>
                            <p className={styles.subtitle}>Role Count</p>
                            <input className={styles.input} value={roleCount} onChange={(e) => setRoleCount(e.target.value)} />
                        </>
                    )}
                    {isPlatoon ? <div>
                        <p className={styles.subtitle}>PLATOON COLOR</p>
                        <SketchPicker
                            color={activeColor}
                            onChangeComplete={handleSetActiveColor}
                            className={styles.sketchColor}
                        />
                    </div> : isSquad  && <div>
                        <AiOutlineWarning size={22} color={'#E9BD3E'} />
                        <p className={styles.subtitle}>
                            by pressing on the role then it creates a free slot<br />
                            you can press several time on the same role !
                        </p>
                    </div>}
                    
                    {isPlatoon ? <div>
                        <p className={styles.subtitle}>Platoon image</p>
                        <ImageUploader isSingle onSubmit={setImage} />
                    </div> : isSquad && <div className={styles.squadData}>
                        {!roles.length && <div onClick={addSquade} className={styles.addSquad}>
                            <FaPlus size={20} />
                        </div>}
                        <div className={styles.squadItems}>
                            {roles?.map((e: RoleType, i: number) => (
                                <Fragment key={e.id}>
                                    <div className={styles.squadItem}>
                                        <div className={styles.squadName}>{e.name}</div>
                                        <RiCloseCircleFill size={29} onClick={() => removeRoleFromSquad(e.id)} color={'rgba(193, 87, 73, 1)'} />
                                    </div>
                                    {i + 1 === roles.length && (
                                        <div onClick={addSquade} className={styles.addSquad}>
                                            <FaPlus size={20} />
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>}
                    <div className={styles.inlineButtons}>
                        <Button onClick={onNext} title='Confirm' />
                        <Button onClick={handleClose} title='Cancel' isCancel />
                    </div>
                </div>
            </div>
        </div>
    )
}
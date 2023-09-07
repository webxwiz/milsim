import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { TbRectangleFilled } from 'react-icons/tb'
import { CiImageOn } from 'react-icons/ci'
import { AiOutlineWarning } from 'react-icons/ai'
import { RiCloseCircleFill } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa'

import { ModalProps } from './interface'
import styles from './Modal.module.scss'
import { platoonColors } from './const'
import { Button } from '../Button'

const squad = [
    {
        id: 1,
        name: 'caption'
    },
    {
        id: 2,
        name: 'sniper'
    },
]

export const FormModal = ({
    isOpen,
    onClose,
    mode = 'platoon',
    isEdit,
}: ModalProps) => {
    const [activeColor, setActiveColor] = useState(0)
    const [imageUpload, setImageUpload] = useState(null)
    const [previewImage, setPreviewImage] = useState('')

    function onChangePreviewImage({ target: { validity, files } }) {
        if (validity.valid && files && files[0])
        setPreviewImage(files)
        const file = files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUpload(reader.result)
            }
            reader.readAsDataURL(file);
        }
      }

    const isPlatoon = mode === 'platoon'
    const isSquad = mode === 'squad'
    const mainTitlePreffix = isEdit ? 'EDIT' : 'NEW'
    const mainTitle = isPlatoon ? `${mainTitlePreffix} PLATOON` : isSquad ? `${mainTitlePreffix} SQUAD NAME` : `${mainTitlePreffix} ROLE`
    const inputTitle = isPlatoon ? 'Platoon Name' : isSquad ? 'Squad Name' : 'Role Name'

    return isOpen && (
        <div className={styles.modal}>
            <div className={styles.formModalContent}>
                <div className={styles.formHeader}>
                    <p className={styles.formModalTitle}>{mainTitle}</p>
                    <IoClose onClick={onClose} size={30} className={styles.close} />
                </div>
                <div className={styles.formContent}>
                    <p className={styles.subtitle}>{inputTitle}</p>
                    <input className={styles.input} />
                    {isPlatoon ? <div>
                        <p className={styles.subtitle}>PLATOON COLOR</p>
                        <div className={styles.colors}>
                            {platoonColors.map(e => (
                                <TbRectangleFilled
                                    size={52}
                                    color={e.color}
                                    key={e.id}
                                    onClick={() => setActiveColor(e.id)}
                                    className={activeColor === e.id ? styles.activeColorIcon : styles.colorIcon}
                                />
                            ))}
                        </div>
                    </div> : isSquad  && <div>
                        <AiOutlineWarning size={22} color={'#E9BD3E'} />
                        <p className={styles.subtitle}>
                            by pressing on the role then it creates a free slot<br />
                            you can press several time on the same role !
                        </p>
                    </div>}
                    {isPlatoon ? <div>
                        <p className={styles.subtitle}>Platoon image</p>
                        <div className={styles.addImage}>
                            <CiImageOn size={30} />
                            <p>Upload a File</p>
                            <input type="file" required onChange={onChangePreviewImage} className={styles.fileInput} />
                            {imageUpload && <img alt='' src={imageUpload} width={200} height={200} className={styles.image} />}
                        </div>
                    </div> : isSquad && <div className={styles.squadData}>
                        {squad.map((e, i) => (
                            <>
                                <div key={e.id} className={styles.squadItem}>
                                    <div className={styles.squadName}>{e.name}</div>
                                    <RiCloseCircleFill size={29} color={'rgba(193, 87, 73, 1)'} />
                                </div>
                                {i + 1 === squad.length && (
                                    <div className={styles.addSquad}>
                                        <FaPlus size={20} />
                                    </div>
                                )}
                            </>
                        ))}
                    </div>}
                    <div className={styles.inlineButtons}>
                        <Button title='Confirm' />
                        <Button title='Cancel' isCancel />
                    </div>
                </div>
            </div>
        </div>
    )
}
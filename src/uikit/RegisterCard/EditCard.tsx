'use client'
import { useEffect, useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io'
import { BsCheckCircleFill } from 'react-icons/bs'

import { RegisterCardProps } from './interface'
import styles from './RegisterCard.module.scss'
import Dropdown from 'react-dropdown'
import { useSession } from 'next-auth/react'
import { RolesType } from '@/components/EventForm/interface'
import { Modal } from '../Modal'

export const EditCard = ({
    title,
    data: dataRoles,
    isEdit,
    onEdit,
    isSelect,
    handleRole,
    squadId,
    busyRoles: busyRolesData,
    onChangeNameRole,
    platoonId,
    removeSquad,
    removeSquadRole
}: RegisterCardProps) => {
    const { data: session } = useSession()

    const [role, setRole] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleChangeModal = () => setIsOpenModal(!isOpenModal)

    const userId = session?.user?.id

    const [data, setData] = useState(dataRoles)

    useEffect(() => {
        setData(dataRoles)
    }, [dataRoles])

    const options = data?.filter((e) => e.count >= 1).map((item, index) => ({
        value: index.toString(),
        label: item.name,
        className: styles.dropdownOption
    }))
    const [busyRoles, setBusyRoles] = useState<RolesType[] | any>(busyRolesData)

    const busyOptions = busyRoles?.filter((e: RolesType) => e.discordId === userId).map((item, index) => ({
        value: index.toString(),
        label: item.name,
        discordId: item.discordId,
        className: styles.dropdownOption
    }))

    const allRolesTaken = data?.every((e: any) => e.count < 1)
    const isMyRole = userId ? (busyRoles?.some(e => e.discordId === userId) && true) : false
    const isShowSelect = isMyRole ? true : !allRolesTaken

    const handleRoleLogic = () => {
        handleRole && handleRole(squadId as string, role as never, playerName, isMyRole)
        if (isMyRole) {
            setBusyRoles([])
            setData(
                dataRoles.map((e: any) => {
                    if (e.name === busyOptions?.[0]?.label) {
                        e.count += 1

                        return e
                    }

                    return e
                })
            )
        }
    }

    const handleRemoveRole = (roleId: string) => {
        removeSquadRole(platoonId, squadId, roleId)
        setData(
            dataRoles.filter(role => role.id !== roleId)
        )
    }
    
    return (
        <div className={styles.editCard}>
            <Modal isOpen={isOpenModal} onClose={handleChangeModal} onSubmit={handleRoleLogic} />
            <div onClick={() => removeSquad(platoonId, squadId)} className={styles.remove}>
                <RiCloseCircleFill size={29} color={'rgba(193, 87, 73, 1)'} />
            </div>
            <p className={styles.title}>{title}</p>
            {isSelect ? (
                <div className={styles.selectRole}>
                    {!isMyRole && allRolesTaken && <p className={styles.title}>All roles are taken</p>}
                    {isShowSelect && <>
                        <Dropdown
                            options={isMyRole ? busyOptions : options}
                            className={isMyRole ? styles.editDropdown : styles.dropdown}
                            value={isMyRole ? busyOptions?.[0]?.value : role}
                            disabled={isMyRole}
                            onChange={(e) => setRole(e.value)}
                            placeholderClassName={styles.dropdownPlaceholder}
                            controlClassName={styles.controlDropdown}
                            arrowClosed={
                                <div>
                                    <IoMdArrowDropdownCircle className={styles.arrowDropdown} />
                                </div>
                            }
                            arrowOpen={
                                <div>
                                    <IoMdArrowDropupCircle className={styles.arrowDropdown} />
                                </div>
                            }
                            placeholder='Role A'
                        />
                        <input
                            value={isMyRole ? busyOptions?.[0]?.discordId : playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder='Player Name'
                            disabled={isMyRole}
                            className={styles.input}
                            style={{
                                border: `1px solid ${isMyRole ? '#C15749' : '#46A7A7'}`
                            }}
                        />
                        {isMyRole ? <RiCloseCircleFill onClick={handleChangeModal} size={29} color={'rgba(193, 87, 73, 1)'} />
                        : <BsCheckCircleFill onClick={handleRoleLogic} size={29} color={'green'} className={styles.checkIcon} />}
                    </>}
                </div>
            ) : <div className={isEdit ? styles.editDataItems : styles.editItems}>
                {data?.map(e => (
                    <div className={styles.editDataItem} key={e.id}>
                        {isEdit ? <input
                            defaultValue={e.name}
                            className={styles.input}
                            onChange={(event) => onChangeNameRole(platoonId, squadId, e.id, event.target.value, 'name')}
                        />
                        : <div>{e.name}</div>}
                        <input
                            defaultValue={e.count}
                            className={styles.input}
                            onChange={(event) => onChangeNameRole(platoonId, squadId, e.id, event.target.value, 'count')}
                        />
                        {isEdit && <RiCloseCircleFill onClick={() => handleRemoveRole(e.id)} size={22} color={'rgba(193, 87, 73, 1)'} />}
                    </div>
                ))}
            </div>}
            {isEdit && (
                <div onClick={onEdit} className={styles.button}>
                    <p>Edit</p>
                </div>
            )}
        </div>
    )
}
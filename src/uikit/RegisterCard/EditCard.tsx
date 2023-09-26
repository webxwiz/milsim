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
import { useTranslations } from 'next-intl'

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
    removeSquadRole,
    indexId,
    busyRolesForAdmin,
    addToWaitingList,
    isWaitingList,
    deleteFromWaitingList,
    addToBusyRoleFromAdm
}: RegisterCardProps) => {
    const { data: session } = useSession()

    const t = useTranslations('Event')

    const [role, setRole] = useState('')
    // const [playerName, setPlayerName] = useState('')
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleChangeModal = () => setIsOpenModal(!isOpenModal)
    
    const userId = session?.user?.id

    const roleData = dataRoles?.find((_, i) => i === indexId)
    
    const [data, setData] = useState(dataRoles)

    useEffect(() => {
        setData(dataRoles)
    }, [dataRoles])

    const options = data?.filter((e: any) => e.count >= 1).map((item, index: number) => ({
        value: index.toString(),
        label: item.name,
        className: styles.dropdownOption
    }))
    const [busyRoles, setBusyRoles] = useState<RolesType[] | undefined>(busyRolesData || [])

    useEffect(() => {
        setBusyRoles(busyRolesData)
    }, [busyRolesData])

    const busyOptions = busyRoles?.filter((e: RolesType) => e.discordId === userId).map((item: RolesType, index: number) => ({
        value: index.toString(),
        label: item.role,
        discordId: item.discordId,
        // playerName: item.playerName,
        className: styles.dropdownOption
    }))

    const allRolesTaken = data?.every((e: any) => e.count < 1)
    const isMyRole = userId ? (busyRoles?.some((e: RolesType) => e.discordId === userId) && true) : false
    const isShowSelect = isMyRole ? true : !allRolesTaken

    const handleRoleLogic = () => {
        handleRole && handleRole(squadId as string, role.label as never, 'playerName', isMyRole, roleData._id as string)
    }

    const handleRoleRemove = () => {
        if (isMyRole) {
            handleRole && handleRole(squadId as string, role.label as never, 'playerName', isMyRole, roleData._id as string)
            setBusyRoles([])
        }
        handleChangeModal()
    }

    const handleRemoveRole = (roleId: string) => {
        removeSquadRole && removeSquadRole(platoonId as string, squadId as string, roleId)
        setData(
            dataRoles.filter((role) => role.id !== roleId) as never
        )
    }
    
    const handleRemoveBusyRole = (roleId: string) => {
        removeSquadRole && removeSquadRole(platoonId as string, squadId as string, roleId)
        setData(
            dataRoles.filter((role) => role.id !== roleId) as never
        )
    }

    // if (busyRolesForAdmin && !data?.length) {
    //     return null
    // }
    
    return (
        <div className={styles.editCard}>
            <Modal isOpen={isOpenModal} onClose={handleChangeModal} onSubmit={handleRoleRemove} />
            <div onClick={() => removeSquad && removeSquad(platoonId as string, squadId as string)} className={styles.remove}>
                {!isSelect && !busyRolesForAdmin && <RiCloseCircleFill size={29} color={'rgba(193, 87, 73, 1)'} />}
            </div>
            <p className={styles.title}>{title}</p>
            {isSelect ? (
                <div>
                <div className={styles.selectRole}>
                    {!isMyRole && allRolesTaken && <p className={styles.title}>{t('allRolesTaken')}</p>}
                    {isShowSelect && <>
                        <Dropdown
                            options={isMyRole ? busyOptions : options}
                            className={isMyRole ? styles.editDropdown : styles.dropdown}
                            value={isMyRole ? busyOptions?.[0]?.value : role.value}
                            disabled={isMyRole}
                            onChange={(e) => setRole(e)}
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
                            placeholder={t('roleA')}
                        />
                        {/* <input
                            value={`${isMyRole ? busyOptions?.[0]?.playerName : playerName}`}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder={t('playerName')}
                            disabled={isMyRole}
                            className={styles.input}
                            style={{
                                border: `1px solid ${isMyRole ? '#C15749' : '#46A7A7'}`
                            }}
                        /> */}
                        {isMyRole ? <RiCloseCircleFill onClick={handleChangeModal} size={29} color={'rgba(193, 87, 73, 1)'} />
                        : <BsCheckCircleFill onClick={handleRoleLogic} size={29} color={'green'} className={styles.checkIcon} />}
                    </>}
                </div>
                </div>
            ) : <div className={isEdit ? styles.editDataItems : styles.editItems}>
                {/* {data?.map((e: any) => (
                    <div className={styles.editDataItem} key={e.id}>
                        {isEdit ? <input
                            defaultValue={e.name}
                            className={styles.input}
                            onChange={(event) => onChangeNameRole && onChangeNameRole(platoonId as string, squadId as string, e.id, event.target.value, 'name')}
                        />
                        : <div>{e.name}</div>}
                        <input
                            defaultValue={e.count}
                            className={styles.input}
                            onChange={(event) => onChangeNameRole && onChangeNameRole(platoonId as string, squadId as string, e.id, event.target.value, 'count')}
                        />
                        {isEdit && <RiCloseCircleFill onClick={() => handleRemoveRole(e.id)} size={22} color={'rgba(193, 87, 73, 1)'} />}
                    </div>
                ))} */}
                {data?.map((e: any) => (
                    <div className={styles.editDataItem} key={e.id}>
                        {isEdit ? <input
                            defaultValue={busyRolesForAdmin ? e.role : e.name}
                            className={styles.input}
                            disabled={busyRolesForAdmin}
                            onChange={(event) => onChangeNameRole && onChangeNameRole(platoonId as string, squadId as string, e.id, event.target.value, 'name')}
                        />
                        : <div>{e.name}</div>}
                        <input
                            defaultValue={busyRolesForAdmin ? e.playerName : e.count}
                            className={styles.input}
                            disabled={busyRolesForAdmin}
                            onChange={(event) => onChangeNameRole && onChangeNameRole(platoonId as string, squadId as string, e.id, event.target.value, 'count')}
                        />
                        {isWaitingList && <RiCloseCircleFill onClick={() => deleteFromWaitingList && deleteFromWaitingList(squadId, e.discordId, e.role, e.roleId)} size={22} color={'rgba(193, 87, 73, 1)'} />}
                        {isWaitingList && <BsCheckCircleFill onClick={() => addToBusyRoleFromAdm && addToBusyRoleFromAdm(squadId, e.roleId, e.role, e.discordId)} size={22} color='green' />}
                        {isEdit && !isWaitingList && !busyRolesForAdmin && <RiCloseCircleFill onClick={() => busyRolesForAdmin ? handleRemoveBusyRole(e.id) : handleRemoveRole(e.id)} size={22} color={'rgba(193, 87, 73, 1)'} />}
                        {!isWaitingList && busyRolesForAdmin && <IoMdArrowDropdownCircle onClick={() => addToWaitingList && addToWaitingList(squadId, e.playerName, e.discordId, e.role, e.roleId)} size={22} color='orange' />}
                    </div>
                ))}
            </div>}
            {!busyRolesForAdmin && isEdit && (
                <div onClick={onEdit} className={styles.button}>
                    <p>{t('edit')}</p>
                </div>
            )}
        </div>
    )
}
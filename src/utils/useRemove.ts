import { useModal } from '../context/Modal'
import { useUser } from '../context/User'

export const useRemove = () => {
  const { dispatch: modalDispatch } = useModal()
  const { dispatch: userDispatch } = useUser()

  const removeModal = () => {
    modalDispatch({
      type: 'CLOSE_MODAL',
    })
  }

  const removeTimer = () => {
    let id = window.setTimeout(() => 0)
    while (id) {
      window.clearTimeout(id)
      id--
    }
  }

  const removeCPFMask = (cpf: string) => cpf.replace(/\D/g, '')

  const removeUser = () => {
    userDispatch({
      type: 'CLEAR_USER',
    })
  }

  return { removeModal, removeTimer, removeCPFMask, removeUser }
}

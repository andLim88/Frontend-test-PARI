import { ref } from 'vue'

export const useNotification = () => {
  const notification = ref({
    show: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false
  })

  const showNotification = (title, message, type = 'info', showConfirm = false) => {
    notification.value = {
      show: true,
      title,
      message,
      type,
      showConfirm
    }
  }

  const closeNotification = () => {
    notification.value.show = false
  }

  return {
    notification,
    showNotification,
    closeNotification
  }
}
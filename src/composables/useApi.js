import axios from 'axios'
import { ref } from 'vue'

export const useApi = () => {
  const API_URL = 'https://api.restful-api.dev'
  const items = ref([])
  const error = ref(null)
  const loading = ref(false)

  const fetchItems = async () => {
    try {
      loading.value = true
      const response = await axios.get(`${API_URL}/objects`)
      items.value = response.data
    } catch (err) {
      error.value = 'Failed to fetch items'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchSingleItem = async (id) => {
    try {
      loading.value = true
      const response = await axios.get(`${API_URL}/objects/${id}`)
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch item'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createItem = async (itemData) => {
    try {
      loading.value = true
      const response = await axios.post(`${API_URL}/objects`, {
        name: itemData.name,
        data: {
          year: parseInt(itemData.year),
          price: parseFloat(itemData.price)
        }
      })
      return response.data
    } catch (err) {
      error.value = 'Failed to create item'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateItem = async (itemData) => {
    try {
      loading.value = true
      const response = await axios.put(`${API_URL}/objects/${itemData.id}`, {
        name: itemData.name,
        data: {
          year: parseInt(itemData.year),
          price: parseFloat(itemData.price)
        }
      })
      return response.data
    } catch (err) {
      error.value = 'Failed to update item'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteItem = async (id) => {
    try {
      loading.value = true
      await axios.delete(`${API_URL}/objects/${id}`)
      return true
    } catch (err) {
      error.value = 'Failed to delete item'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    error,
    loading,
    fetchItems,
    fetchSingleItem,
    createItem,
    updateItem,
    deleteItem
  }
}
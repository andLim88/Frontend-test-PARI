<template>
  <MainLayout>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <button 
        @click="showAddModal = true"
        class="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Item
      </button>

      <ItemsList 
        :items="items"
        @view="viewItem"
        @edit="selectItemToEdit"
        @delete="confirmDelete"
      />
      
      <AddItemModal
        v-model="showAddModal"
        @submit="handleCreateItem"
      />
      
      <EditItemModal
        v-model="showEditModal"
        :item="selectedItem"
        @submit="handleUpdateItem"
      />
      
      <ItemDetailsModal
        v-model="showDetailsModal"
        :item="viewedItem"
      />

      <NotificationModal
        v-model:show="notification.show"
        :title="notification.title"
        :message="notification.message"
        :type="notification.type"
        :showConfirm="notification.showConfirm"
        @close="closeNotification"
        @confirm="handleConfirm"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import ItemsList from './components/ItemsList.vue'
import AddItemModal from './components/AddItemModal.vue'
import EditItemModal from './components/EditItemModal.vue'
import ItemDetailsModal from './components/ItemDetailsModal.vue'
import NotificationModal from './components/NotificationModal.vue'
import { useApi } from './composables/useApi'
import { useNotification } from './composables/useNotification'

const { 
  items, 
  fetchItems, 
  fetchSingleItem, 
  createItem, 
  updateItem, 
  deleteItem 
} = useApi()

const {
  notification,
  showNotification,
  closeNotification
} = useNotification()

const selectedItem = ref(null)
const viewedItem = ref(null)
const itemToDelete = ref(null)

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)

const viewItem = async (id) => {
  try {
    viewedItem.value = await fetchSingleItem(id)
    showDetailsModal.value = true
  } catch (error) {
    showNotification('Error', 'Failed to view item', 'error')
  }
}

const handleCreateItem = async (itemData) => {
  try {
    const newItem = await createItem(itemData)
    items.value.push(newItem)
    showAddModal.value = false
    showNotification('Success', 'Item created successfully', 'success')
  } catch (error) {
    showNotification('Error', 'Failed to create item', 'error')
  }
}


const selectItemToEdit = (item) => {
  selectedItem.value = {
    id: item.id,
    name: item.name,
    year: item.data?.year || '',
    price: item.data?.price || ''
  }
  showEditModal.value = true
}

const handleUpdateItem = async (itemData) => {
  try {
    const updatedItem = await updateItem(itemData)
    const index = items.value.findIndex(item => item.id === itemData.id)
    if (index !== -1) {
      items.value[index] = updatedItem
    }
    selectedItem.value = null
    showEditModal.value = false
    showNotification('Success', 'Item updated successfully', 'success')
  } catch (error) {
    showNotification('Error', 'Failed to update item', 'error')
  }
}

const confirmDelete = (id) => {
  itemToDelete.value = id
  showNotification(
    'Confirm Delete',
    'Are you sure you want to delete this item?',
    'info',
    true
  )
}

const handleConfirm = async () => {
  if (itemToDelete.value) {
    try {
      await deleteItem(itemToDelete.value)
      items.value = items.value.filter(item => item.id !== itemToDelete.value)
      showNotification('Success', 'Item deleted successfully', 'success')
    } catch (error) {
      showNotification('Error', 'Failed to delete item', 'error')
    } finally {
      itemToDelete.value = null
      closeNotification()
    }
  }
}

onMounted(() => {
  fetchItems()
})
</script>
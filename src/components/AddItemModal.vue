<template>
  <Modal v-model="show">
    <template #header>Add New Item</template>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="itemData.name" type="text" class="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Year</label>
        <input v-model="itemData.year" type="number" class="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input v-model="itemData.price" type="number" step="0.01" class="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>
    </form>

    <template #footer>
      <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Cancel
      </button>
      <button @click="handleSubmit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Item
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const itemData = reactive({
  name: '',
  year: '',
  price: ''
})

const handleSubmit = () => {
  emit('submit', { ...itemData })
  closeModal()
  itemData.name = ''
  itemData.year = ''
  itemData.price = ''
}

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>
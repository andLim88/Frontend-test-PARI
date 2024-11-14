<template>
  <Modal v-model="show">
    <template #header>Edit Item</template>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="formData.name" type="text" class="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Year</label>
        <input v-model="formData.year" type="number" class="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input v-model="formData.price" type="number" step="0.01" class="mt-1 p-2 block w-full rounded-md border border-black shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>
    </form>
    
    <template #footer>
      <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Cancel
      </button>
      <button @click="handleSubmit" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        Update Item
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const formData = reactive({
  name: '',
  year: '',
  price: ''
})

watch(() => props.item, (newVal) => {
  if (newVal) {
    formData.name = newVal.name
    formData.year = newVal.data?.year || ''
    formData.price = newVal.data?.price || ''
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', {
    id: props.item.id, 
    ...formData
  })
  closeModal()
}

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>
<template>
    <Modal v-model="show">
      <template #header>Item Details</template>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">ID</label>
          <p class="mt-1 border border-black rounded p-2">{{ item?.id }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <p class="mt-1 border border-black rounded p-2">{{ item?.name }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Year</label>
          <p class="mt-1 border border-black rounded p-2">{{ item?.data?.year || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <p class="mt-1 border border-black rounded p-2">${{ item?.data?.price || '-' }}</p>
        </div>
      </div>
      
      <template #footer>
        <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Close
        </button>
      </template>
    </Modal>
</template>
  
<script setup>
  import { computed } from 'vue'
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

  const emit = defineEmits(['update:modelValue'])

  const show = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  const closeModal = () => {
    emit('update:modelValue', false)
  }
</script>
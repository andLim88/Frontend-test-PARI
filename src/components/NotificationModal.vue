<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="mb-4">
          <h3 class="text-lg font-medium" :class="{
            'text-green-600': type === 'success',
            'text-red-600': type === 'error',
            'text-blue-600': type === 'info'
          }">
            {{ title }}
          </h3>
          <p class="text-gray-600 mt-2">{{ message }}</p>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            v-if="showConfirm"
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Notification'
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info'].includes(value)
    },
    showConfirm: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits(['close', 'confirm'])
</script>
  

  
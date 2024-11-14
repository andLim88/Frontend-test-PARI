<template>
    <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div class="px-6 py-4 border-b">
            <h3 class="text-xl font-semibold text-gray-900">
              <slot name="header"></slot>
            </h3>
          </div>
          
          <div class="px-6 py-4">
            <slot></slot>
          </div>
          
          <div class="px-6 py-4 border-t flex justify-end space-x-2">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  defineEmits(['update:modelValue'])
</script>
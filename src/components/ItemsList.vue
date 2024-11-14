<template>
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Items List</h2>
        <div class="bg-white shadow-2xl border border-black rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr class="border-b border-black">
                <th class="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-black tracking-wider">No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-black tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-black tracking-wider">Year</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-black tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase border border-black tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in items" :key="item.id" class="border-b border-black">
                <td class="px-2 py-4 whitespace-nowrap border border-black">{{ index + 1 }}</td>
                <td class="px-6 py-4 whitespace-nowrap border border-black">{{ item.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap border border-black">{{ item.data?.year || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap border border-black">${{ item.data?.price || '-' }}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                  <button @click="$emit('view', item.id)" class="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                  <button @click="$emit('edit', item)" class="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button @click="$emit('delete', item.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>
    
<script setup>
    defineProps({
      items: {
        type: Array,
        required: true
      }
    })
    
    defineEmits(['view', 'edit', 'delete'])
</script>
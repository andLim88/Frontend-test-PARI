<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      
      <main class="flex-grow">
        <slot></slot>
      </main>
  
      <Footer />
    </div>
</template>
  
<script setup>
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
</script>
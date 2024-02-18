<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="logout">Increment</button>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter()
const store=useUserStore()
function logout(){
  store.logout()
  router.push('/login')
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

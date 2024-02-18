<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Login from './views/Login.vue'
import Layout from './components/layout/index.vue'
import { useUserStore } from './stores/user';

const store=useUserStore()
store.init=true
</script>

<template>

   <el-skeleton :rows="5" animated v-if="store.init"/>
 <RouterView/>
</template>

<style scoped>


</style>

<template>
  <div class="layout">ss
    <el-menu    class="el-menu-vertical-demo" mode="horizontal"   @select="routeTo" :default-active="route.path">
      <el-sub-menu :index="title.name" v-for="title in Menu" >
      <template #title>{{title.name}}</template>
  
      <el-sub-menu  :index="sec.name" v-for="sec in title.children" >
        <template #title>{{ sec.name }}</template>
        <el-menu-item :index="path.path" v-for="path in sec.children" >{{path.name}}</el-menu-item>
      </el-sub-menu> 
    </el-sub-menu>

    </el-menu>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue';
const store = useUserStore()
const Menu = store.Menu
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()

function routeTo(index:string){
  console.log(index,'index')
  router.push(index)
}
onMounted(()=>{
  store.init=false
})
</script>

<style  >

</style>
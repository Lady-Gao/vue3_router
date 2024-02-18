<template>
    <div>
login
<button @click="login">Login</button>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import { loginApi } from '@/api/login';
import { resetRouter } from '@/router';
const store=useUserStore()
store.init=false
const counterS=useCounterStore()
const router = useRouter()
// function login(){
//   store.saveUser('b84e4891-6798-4eec-9d44-300f7e03d1f1')
//   counterS.count=3434
//   router.push('/about')
// }
let login = async () => {
  //请求token
  let params={
     password:'a5450fefb424604b5e5e81d688e9d4dbf6a974bcb46100aaa89fe357d9763a0592e6d261782ce321b3395fdeba841d46930806fc253108eabd113d2526745051',
    username:'11111111/admin/zh_CN'
   
    }
 
  const userInfo= await loginApi(params);
  store.saveUser(userInfo)
  
  
  const data=await resetRouter()
  console.log(data)
  setTimeout(() => {
    router.push('/')
  }, 2000);
};
</script>

<style lang="scss" scoped>

</style>
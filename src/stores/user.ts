import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const init=ref(true)
  const userName = ref('')
  const token = ref('')
  const userId = ref('')
  const enterpriseName = ref('')
  const enterpriseId = ref('')
  function saveUser(user: any) {
    token.value= user.access_token
    userName.value= user.userName
    userId.value= user.userId
    enterpriseName.value= user.enterpriseName
    enterpriseId.value= user.enterpriseId
    sessionStorage.setItem('token', user.access_token)
  }
  const Menu=ref([])
  function saveMenu(data: any) {  
    Menu.value=data
    sessionStorage.setItem('Menu', JSON.stringify(data))
  }
function logout() {
 console.log('logout')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
  }
  return {
    token,
    userName,
    userId,
    enterpriseName,
    enterpriseId,
    Menu,
    init,
    saveUser,
    logout,
    saveMenu
  }
}
,
{persist:true}
)

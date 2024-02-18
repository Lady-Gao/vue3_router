//1.引入vue
// import Vue from 'vue'
//2.引入axios库
import axios from "axios";
import config from '@Config'//引入公用文件
import router from "@/router";
axios.defaults.timeout =60000;//请求超时时间
axios.interceptors.request.use(//请求拦截
    config => {
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let token =sessionStorage.getItem('token');
        // let token=store.getters.getToken;
      if (token) {//如果有token给请求头加上
           config.headers!["Authorization"] = 'Bearer ' + token;
      } 
        return config
    },

    err => {
        return Promise.reject(err);
    } 

)

axios.interceptors.response.use(response => {//相应拦截
    if(response.data.code==10001||response.data.code==402){//如果token为空或者过期，跳到登录
        sessionStorage.setItem('token',"");
        router.push({path:"/login"});
       
    }
    return response;
}
    ,err=>{
        return Promise.reject(err)
    }
);

 const http=function(params:any){
    return new Promise((resolve,reject)=>{
      
        let datas: object;
        if (params.method) {
            datas = { data:params.data }
        } else {
            datas = { params: params.params }
        };
        // console.log(`${config.host}${params.path}`,params,'params')
   
        axios({
            ...params  ,                      
            url:`${config.host}${params.path||params.url}`,
           
        }).then((mess:any) => {
            const {data} = mess;
             //closeErrorCode  false使用http的提示，true自己内部判断
             if(!data.flag&&!params.closeErrorCode){
               console.log(mess,'使用全局报错语句')
            }
            resolve(mess.data) 
        }).catch(error=>{
            if(error.response){
                const code = error.response.status;
                if (code == 401) {
                    sessionStorage.removeItem('token')
                      //未登录
                    // return window.location.href = "/login";
                } 
            }
             resolve({
                flag:false,
                errorCode:500
             })
            //   reject(-1)
        }
            )
    })
};

export default http




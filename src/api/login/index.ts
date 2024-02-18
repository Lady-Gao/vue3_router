
import http from "@/utils/request";
export const loginApi = (params) => {

    return http({
        path: "/auth/oauth/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa("web:web"),
        },
        data: encodeURI(
            "grant_type=password&username=" +
            params.username +
            "&password=" +
            params.password +
            "&scope=server"
        ),
        closeErrorCode: true,
    },
    ) 
}
export const upApi = (data) => {
    return http({
        path: "/users",
        method: "POST",
        data
    })
}
export const UserInfoApi = () => {
    return http({
        path: '/basic/user/getCurrentUserInfo',
    })
}


// import UserTree from "./data.json";
export const getCurrentUserTreeApi = () => {
    // return UserTree
    return http({
        path: "/basic/resource/getCurrentUserTree",
        method: "POST",
        // closeErrorCode:true,//true 关闭全局的报错语句 
    }) 
}

//获取公司树信息
export const getEnterpriseTreeList = () => {
    return http({
        path: "/basic/sysEnterprise/getEnterpriseTreeList",
    })
}
//机构树
export const  getOrganizationTreData=(params) =>{
      return  http({
            url: "/basic/sysEnterprise/findEnterpriseOrganizationTreeList",
            method: "GET",
            params
        })
}
//车辆树
export const  findVehicleTreeInfoList=() =>{
      return  http({
        url: "/basic/tree/findVehicleTreeInfoList",
        method: "GET"
        })
}
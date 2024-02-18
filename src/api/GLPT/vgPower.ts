import { httpRes } from "@/types/http";
import http from "@/utils/request";

   //获取车组权限
export const findEnterpriseFleetInfoListByEnt = (params:any) => {
    return http({
        method: "get",
        url: "/basic/fleet/findEnterpriseFleetInfoListByEnt",
        params: params
    })as Promise<httpRes<{}>>;
}
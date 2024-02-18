import { httpRes } from "@/types/http";
import http from "@/utils/request";

//获取车辆列表
export const findVehiclePage = (params:any) => {
    return http({
        url: '/basic/vehicle/findVehiclePage',
        method: 'get',
        params,
    })as Promise<httpRes<{}>>;
}
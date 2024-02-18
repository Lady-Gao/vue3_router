import { httpRes } from "@/types/http";
import http from "@/utils/request";

type findAlarmPolymerizationInfoListType = {
    vehicleIds: String
    alarmTypeIds: String
    mapType: Number
    startTime: String
    endTime: String
    status: String
    current: Number
  
}
export const findAlarmPolymerizationInfoList = (params: findAlarmPolymerizationInfoListType) => {
    return http({
        path: '/gps/alarmDispose/findAlarmPolymerizationInfoList',
        params,
        // method: "GET",
    }) as Promise<httpRes<{}>>
}
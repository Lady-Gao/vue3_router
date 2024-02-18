import { httpRes } from "@/types/http";
import http from "@/utils/request";
import { unzip } from "@/utils/zip";
type findDailyMileage = {
    vehicleId: string,
    startTime: string,
    endTime: string,
    isCompress: boolean,
    isAllLocations: boolean,
    mapType: number,
    isPoi: boolean,//是否把经纬度解析成具体的地址
}
export const findDailyMileage = (params: findDailyMileage) => {
  return  new Promise(function(resolve, reject){
        http({
            path: '/gps/vtrack/findDailyMileage',
            params,
            responseType: "arraybuffer",
            method: "GET",
        }).then((result:any) => {
            let obj:any = {
                dataTimes: [],
                high: [],
                dspeed: [],
                gpsSpeed: [],
                oilMass: [],
                accState: [],
                mapLatitude: [],
                mapLongitude: []
            },lnglatArr:Array<number[]>=[];//经纬度数组
            //判断类型
            console.log(result,'result')
         if(result.constructor!=ArrayBuffer){
            console.log('ArrayBuffer')
           return resolve(result)
         }
            let { data, flag, errorCode } = JSON.parse(unzip(result));
            console.log(data, flag, errorCode,'data, flag, errorCode')
            if (flag && errorCode == 200) {
                const zipData = JSON.parse(data);
                JSON.parse(zipData.listAll).forEach((el:any) => {
                    obj.dataTimes.push(el.gpsTime);
                    obj.high.push(el.high);
                    obj.gpsSpeed.push(el.gpsSpeed);
                    obj.oilMass.push(el.oilMass);
                    obj.mapLatitude.push(el.mapLatitude);
                    obj.mapLongitude.push(el.mapLongitude);
                    obj.dspeed.push(el.dspeed);
                    obj.accState.push(el.accState);
                    lnglatArr.push([Number(el.mapLongitude),Number(el.mapLatitude)])
                })
                let jsonData = {
                    ...zipData,
                    listAll:zipData.listAll ? JSON.parse(zipData.listAll) : [],//下拉面板数据
                    listST:zipData.listST ? JSON.parse(zipData.listST) : [],//左侧面板数据
                    charts: zipData.charts ? JSON.parse(zipData.charts) : obj,
                    alarmMap: zipData.alarmMap ? JSON.parse(zipData.alarmMap) : [],
                    lnglatArr
                }
                resolve({
                    data: jsonData,
                    flag,
                    errorCode
                });
            } else {
                resolve( {
                    data,
                    flag,
                    errorCode
                });
            }
    
        })
    });

}
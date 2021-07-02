import axios from "@/request/axios";
const api = {
  pictureList:
    "/?&s=App.Table.FreeQuery&return_data=0&model_name=pictureList&logic=and",
  labelList:
    "/?&s=App.Table.FreeQuery&return_data=0&model_name=labelList&logic=and",
  updatePicture:
    "/?&s=App.Table.FreeUpdate&return_data=0&model_name=pictureList&logic=and",
  updateFrequency:
    "/?&s=App.Table.FreeUpdate&return_data=0&model_name=frequency&logic=and",
  getFrequency:
    "/?&s=App.Table.Get&return_data=0&model_name=frequency"
};

/**
 *  图片列表
 */
export function pictureList(parameters) {
  return axios.formRequest.post(api.pictureList, parameters);
}
/**
 *  标签列表
 */
export function labelList(parameters) {
  return axios.formRequest.post(api.labelList, parameters);
}

/**
 *  编辑图片(修改下载量)
 */
export function updatePicture(parameters) {
  return axios.formRequest.post(api.updatePicture, parameters);
}
/**
 *  更新 网站访问统计次数
 */
export function updateFrequency(parameters) {
  return axios.formRequest.post(api.updateFrequency, parameters);
}
/**
 * 获取 网站访问统计次数
 */
export function getFrequency(parameters) {
  return axios.formRequest.post(api.getFrequency, parameters);
}

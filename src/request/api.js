import axios from "@/request/axios";
const api = {
  login: "/?s=App.User.LoginExt",
  pictureList:
    "/?&s=App.Table.FreeQuery&return_data=0&model_name=pictureList&logic=and",
  labelList:
    "/?&s=App.Table.FreeQuery&return_data=0&model_name=labelList&logic=and",
  createPicture: "/?&s=App.Table.Create&return_data=0&model_name=pictureList",
  updatePicture:
    "/?&s=App.Table.FreeUpdate&return_data=0&model_name=pictureList&logic=and",
  DeletePicture: "/?s=App.Table.Delete&return_data=0&model_name=pictureList"
};

/**
 *  登录
 */
export function login(parameters) {
  return axios.formRequest.post(api.login, parameters);
}
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
 *  添加图片
 */
export function createPicture(parameters) {
  return axios.formRequest.post(api.createPicture, parameters);
}
/**
 *  编辑图片
 */
export function updatePicture(parameters) {
  return axios.formRequest.post(api.updatePicture, parameters);
}
/**
 * 删除图片
 */
export function DeletePicture(parameters) {
  return axios.formRequest.post(api.DeletePicture, parameters);
}

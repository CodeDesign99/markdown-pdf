import { http } from "/@/utils/http/http";

/** 获取代码字段 */
export const getCodeText = (params?: object) => {
  return http.request<string>("get", "/getCodeText", { params });
};

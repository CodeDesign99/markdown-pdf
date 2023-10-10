import { http } from "/@/utils/http/http";

export type LiveKitUrl = {
  livekitUrl: string
}

/** 获取LiveKitUrl */
export const getLiveKitUrl = (params?: object) => {
  return http.request<LiveKitUrl>("get", "/getLiveKitUrl", { params });
};

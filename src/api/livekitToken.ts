import { http } from "/@/utils/http/http";

export type LivekitToken = {
  identity: string,
  accessToken: string
}

/** 获取LiveKitToken */
export const getLiveKitToken = (url: string) => {
  return http.request<LivekitToken>("get", url);
};

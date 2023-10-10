import { ref, watchEffect } from "vue";
import { getLiveKitToken } from "../api/livekitToken";


/** @public */
export interface UserInfo {
  identity?: string;
  name?: string;
  metadata?: string;
  id?: string;
}

/** @public */
export interface UseTokenOptions {
  userInfo?: UserInfo;
}

export function useToken(
  tokenEndpoint: string | undefined,
  roomName: string,
  options: UseTokenOptions = {},
) {
  const token = ref('')

  watchEffect(() => {
    if (tokenEndpoint === undefined) {
      throw Error('token endpoint needs to be defined');
    }
    if (options.userInfo?.identity === undefined) {
      return;
    }
    const tokenFetcher = async () => {
      // log.debug('fetching token');
      const params = new URLSearchParams({ ...options.userInfo, roomName });
      const { accessToken } = await getLiveKitToken(`${tokenEndpoint}?${params.toString()}`);
      // const { accessToken } = await res.json();
      token.value = accessToken
    };
    tokenFetcher();
  });
  return token;
}

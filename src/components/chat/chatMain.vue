<template>
  <div data-lk-theme="default" class="chat-main">
    <LiveKitRoom
      v-if="userChoices"
      :room=room
      :token=token
      :serverUrl=liveKitUrl
      :connectOptions=connectOptions
      :video=userChoices.videoEnabled
      :audio=userChoices.audioEnabled
      :onDisconnected=onLeave
    >
      <VideoConference :chatMessageFormatter='formatChatMessageLinks' />
    </LiveKitRoom>
    <div v-else :style="{ display: 'grid', placeItems: 'center', height: '100%' }">
      <PreJoin
        :onError='(err) => console.log("error while setting up prejoin", err)'
        :defaults="{
          username: userStore.username,
          videoEnabled: true,
          audioEnabled: true,
        }"
        :onSubmit='setPreJoinChoices'
      ></PreJoin>
    </div>
  </div>
</template>

<script lang="ts">
import {
  LiveKitRoom,
  PreJoin,
  LocalUserChoices,
  VideoConference,
  formatChatMessageLinks,
} from '@livekit/components-react';

import {
  ExternalE2EEKeyProvider,
  LogLevel,
  Room,
  RoomConnectOptions,
  RoomOptions,
  VideoPresets,
} from 'livekit-client';

import { computed, defineComponent, reactive, ref } from 'vue';
import { applyPureReactInVue, applyReactInVue } from 'veaury';
import { useToken } from '/@/hooks/useToken';
import { useUserStoreHook } from '/@/store/modules/user';
import { decodePassphrase } from '/@/utils/client-utils';
import { getLiveKitUrl } from '/@/api/url';

export default defineComponent({
  name: "ChatMain",
  components: {
    LiveKitRoom: applyPureReactInVue(LiveKitRoom),
    VideoConference: applyPureReactInVue(VideoConference),
    PreJoin: applyPureReactInVue(PreJoin),
    formatChatMessageLinks: applyPureReactInVue(formatChatMessageLinks)
  },
  setup() {
    const userChoices = ref<LocalUserChoices | undefined>(undefined);

    const hash = typeof window !== 'undefined' && window.location.hash;
    const worker =
      typeof window !== 'undefined' &&
      new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));

    const e2eeEnabled = !!(hash && worker);
    const keyProvider = new ExternalE2EEKeyProvider();
    const roomOptions = computed((): RoomOptions => {
      return {
        videoCaptureDefaults: {
          deviceId: userChoices.value?.videoDeviceId,
          resolution: VideoPresets.h720,
        },
        publishDefaults: {
          videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
          red: !e2eeEnabled,
        },
        audioCaptureDefaults: {
          deviceId: userChoices.value?.audioDeviceId,
        },
        adaptiveStream: { pixelDensity: 'screen' },
        dynacast: true,
        e2ee: e2eeEnabled
          ? {
              keyProvider,
              worker,
            }
          : undefined,
      };
    });
    const room = computed(() => new Room(roomOptions.value));
    if (e2eeEnabled) {
      keyProvider.setKey(decodePassphrase(hash.substring(2)));
      room.value.setE2EEEnabled(true);
    }
    const connectOptions = computed((): RoomConnectOptions => {
      return {
        autoSubscribe: false,
      };
    });
    const roomName = ref('abcd-1234')
    const userStore = useUserStoreHook()
    const LK_TOKEN_ENDPOINT = import.meta.env.VITE_PUBLIC_LK_TOKEN_ENDPOINT

    const token = useToken(LK_TOKEN_ENDPOINT, roomName.value, {
      userInfo: {
        identity: userStore.username,
        name: userStore.username,
        id: userStore.id
      },
    });
    const liveKitUrl = ref('')
    getLiveKitUrl({ id: userStore.id }).then(url => {
      liveKitUrl.value = url.livekitUrl
    })

    const onLeave = () => {
      userChoices.value = undefined
    }
    const setPreJoinChoices = (value) => {
      userChoices.value = value
    }
    return {
      token,
      liveKitUrl,
      room,
      connectOptions,
      userChoices,
      userStore,
      setPreJoinChoices,
      formatChatMessageLinks,
      onLeave
    }
  }
})
</script>
<style lang="scss">
.chat-main {
  height: 100%;
  background-color: var(--lk-bg);
}
</style>

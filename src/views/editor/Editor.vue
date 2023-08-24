<template>
  <div class="editor">
    <div class="editor-container">
      <textarea class="editor-box" v-model="markdownText" placeholder="Type your Markdown here..."></textarea>
    </div>
    <div class="preview-container">
      <button class="export-file" @click="exportPdf"></button>
      <div ref="preview" class="markdown-preview"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, ref, watch } from 'vue';
  import { getCodeText } from '/@/api/text';
  import { useUserStoreHook } from '/@/store/modules/user';
  import { markdowmTextToHtml } from '/@/utils/md'
  import { highlightAll, highlightElement } from "/@/utils/hljs"
  import { generatePDF, htmlToPdf, outputPdf } from '/@/utils/jspdf'

  const userStore = useUserStoreHook()
  const markdownText = ref('')
  const preview = ref(null)

  watch(() => markdownText.value, (newValue) => {
    const elements = markdowmTextToHtml(newValue)
    const previewDom = preview.value
    nextTick(() => {
      while (previewDom.firstChild) {
        previewDom.removeChild(previewDom.firstChild);
      }
      elements.each((i, element) => {
        previewDom.appendChild(element)
        // highlightElement(element)
      });
      highlightAll()
    })
  })

  function exportPdf() {
    // htmlToPdf(preview.value)
    // generatePDF(preview.value)
    outputPdf(preview.value)
  }

  getCodeText({ id: userStore.id }).then(data => {
    markdownText.value = data
  })
  .catch(console.log)
</script>
<style lang="scss" scoped>
.editor {
  display: flex;
  justify-content: start;
  position: relative;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: hsla(0,0%,100%,.3);
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    filter: blur(20px);
    margin: -30px;
    z-index: -1;
  }
  .editor-container {
    width: 100%;
    padding: 1rem;
    .editor-box {
      width: inherit;
      height: 100%;
      outline: none;
      border-color: none;
      background: transparent;
      color: #000;
    }
  }
  .preview-container {
    width: 100%;
    padding: 1rem;
    overflow: auto;
    // .markdown-preview {
    //   height: 100%;
    // }
    .export-file {
      position: absolute;
      top: 4px;
      right: 4px;
      z-index: 3;
      display: block;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      width: 40px;
      height: 40px;
      background-color: hsla(0, 0%, 100%, 0.5);
      opacity: 0;
      cursor: pointer;
      background-image: url('/@/assets/svg/exportFile.svg');
      background-position: 50%;
      background-size: 20px;
      background-repeat: no-repeat;
      transition: opacity .4s;
    }
    &:hover .export-file {
      opacity: 1;
    }
  }
}
</style>

function markdowmTextToHtml() {
  throw new Error('Function not implemented.');
}

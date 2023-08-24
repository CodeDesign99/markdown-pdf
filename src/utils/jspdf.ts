import { jsPDF } from "jspdf";
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas';

type Options = {
  // 页面边距（以毫米为单位）
  margin: number;
  // 生成的 PDF 文件名
  filename: string;
  // 图像选项，用于将页面内容转换为图像
  image: {
    type: string;
    quality: number;
  }
  // html2canvas 库的选项
  html2canvas: {
    scale: number;
  }
  jsPDF: {
    // 单位（mm、pt、px）
    unit: 'mm' | 'pt' | 'px';
    // 页面格式（a0、a1、a2、a3、a4、a5、a6、letter、legal）
    format: 'a0' | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'letter' | 'legal';
    // 页面方向（portrait 或 landscape）
    orientation: 'portrait' | 'landscape'
  }
}
type DeepPartial<T extends Object> = {
  [P in keyof T]?: T[P] extends Object ? DeepPartial<T[P]> : T[P]
}
type OutputOptions = DeepPartial<Options>

const outputOptions: OutputOptions = {
  margin: 10,
  filename: 'generated.pdf',
  // image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 1 },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait'
  } // jsPDF 库的选项
}

export function htmlToPdf (element: HTMLElement, options: OutputOptions = outputOptions) {
  html2pdf().set(options).from(element).save()
}

export async function generatePDF(element: HTMLElement) {
  // 使用 html2canvas 将元素渲染为图像
  const canvas = await html2canvas(element);
  // 创建一个新的 jsPDF 实例
  const pdf = new jsPDF();
  // 将 canvas 图像添加到 PDF
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297); // A4 页面大小
  // 保存 PDF 文件
  pdf.save('generated-pdf.pdf');
}

export function outputPdf(element: HTMLElement) {
  const { width, height } = getGeometryInfo(element)
  const doc = new jsPDF("p", "pt", [width, height]);
  doc.html(element, {
    callback: function (doc) {
      doc.save('output.pdf');
    }
  });
}

function getGeometryInfo(element: HTMLElement) {
  const dpi = window.devicePixelRatio * 96
  const width = dpi * element.clientWidth / 72
  const height = dpi * element.clientHeight / 72
  return {
    width,
    height
  }
}

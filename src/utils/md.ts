import showdown from 'showdown'
import $ from 'jquery'

const converter = new showdown.Converter()

export function markdowmTextToHtml(markdownText: string): JQuery {
  const html = converter.makeHtml(markdownText) || ''
  return $(html)
}

export function htmlTextToMarkdownText(htmlText: string): string {
  return converter.makeMarkdown(htmlText)
}

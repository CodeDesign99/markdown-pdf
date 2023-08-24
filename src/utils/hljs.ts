import hljs from "highlight.js"
import "highlight.js/styles/github-dark-dimmed.css"

export function highlightElement(element: HTMLElement): void {
  hljs.highlightElement(element)
}

export function highlightAll(): void {
  hljs.highlightAll()
}


'use client'

import { useEffect, useRef } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import 'katex/dist/katex.min.css'
import './custom-katex.css'  // Custom CSS for KaTeX

export default function MarkdownFromRaw({ markdown }: { markdown: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function render() {
      const file = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeKatex as any)
        .use(rehypeStringify as any)
        .process(markdown)

      if (ref.current) {
        ref.current.innerHTML = String(file)
      }
    }

    render()
  }, [markdown])

  return <div className="prose max-w-none" ref={ref} />
}


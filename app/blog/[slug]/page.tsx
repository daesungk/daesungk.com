export const runtime = 'nodejs' 

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import MarkdownFromRaw from '../../../components/MarkdownFromRaw'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = await fs.readdir(dir)
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({ slug: file.replace(/\.mdx$/, '') }))
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
    const file = await fs.readFile(filePath, 'utf8')
    const { content, data } = matter(file)

    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {data.date ? new Date(data.date).toLocaleDateString() : ''}
        </p>
        <MarkdownFromRaw markdown={content} />
      </div>
    )
  } catch {
    notFound()
  }
}


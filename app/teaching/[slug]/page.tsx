import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import MarkdownFromRaw from '../../../components/MarkdownFromRaw'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/teaching')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  return files.map(file => ({ slug: file.replace(/\.mdx$/, '') }))
}

export default function TeachingPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'content/teaching', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()

  const file = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(file)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{data.semester} — {data.institution}</p>
      <MarkdownFromRaw markdown={content} />
    </div>
  )
}

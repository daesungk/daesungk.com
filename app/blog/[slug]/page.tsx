import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import MarkdownFromRaw from '../../../components/MarkdownFromRaw'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(BLOG_DIR)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({ slug: file.replace(/\.mdx$/, '') }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`)
    const file = await fs.readFile(filePath, 'utf8')
    const { data } = matter(file)

    return {
      title: data.title || params.slug,
      description: data.description || '',
    }
  } catch {
    return {
      title: 'Not Found',
    }
  }
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string }
}) {
  const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`)

  try {
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


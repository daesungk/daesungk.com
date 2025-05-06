import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import MarkdownFromRaw from '../../../components/MarkdownFromRaw'
import { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

// ✅ Required in Next.js App Router: async component
export default async function BlogPage({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`)

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

// ✅ async + properly typed
export async function generateStaticParams(): Promise<PageProps['params'][]> {
  const folderPath = path.join(process.cwd(), 'content/blog')
  const files = await fs.readdir(folderPath)
  return files
    .filter(f => f.endsWith('.mdx'))
    .map(file => ({ slug: file.replace(/\.mdx$/, '') }))
}

// ✅ optional: SEO support
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`)

  try {
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


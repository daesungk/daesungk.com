import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function BlogIndex() {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const file = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data } = matter(file)
    return {
      slug: filename.replace(/\.mdx$/, ''),
      title: data.title || filename,
      date: data.date || '',
    }
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
          </Link>
        ))}
      </div>
    </div>

  )
}




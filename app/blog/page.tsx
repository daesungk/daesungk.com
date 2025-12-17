import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function BlogIndex() {
  const dir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  
  const posts = files.map((filename) => {
    const file = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data, content } = matter(file)
    
    // Extract first few sentences (approximately 150 characters)
    const plainText = content
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
      .trim()
    
    const excerpt = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '')
    
    return {
      slug: filename.replace(/\.mdx$/, ''),
      title: data.title || filename,
      date: data.date || '',
      excerpt: data.excerpt || excerpt,
    }
  })
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  //posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100">Blog</h1>
      
      <div className="space-y-8">
        {posts.map(post => (
          <article 
            key={post.slug}
            className="group border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              {/* Title and Date Row */}
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </time>
              </div>
              
              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                {post.excerpt}
              </p>
              
              {/* Read More Link */}
              <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all">
                Read more
                <svg 
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

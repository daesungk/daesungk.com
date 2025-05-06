import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownFromRaw from '../components/MarkdownFromRaw'

export default function HomePage() {
  const filePath = path.join(process.cwd(), 'content', 'mainpage.mdx')
  const file = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(file)

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{data.title ?? 'Home'}</h1>
      <MarkdownFromRaw markdown={content} />
    </>
  )
}

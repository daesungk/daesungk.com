import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownFromRaw from '../../components/MarkdownFromRaw'

export default function ResearchPage() {
  const filePath = path.join(process.cwd(), 'content/research.mdx')
  const file = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(file)

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{data.title ?? 'Research'}</h1>
      <MarkdownFromRaw markdown={content} />
    </>
  )
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Course {
  slug: string
  title: string
  semester: string
  institution: string
}

// Optional: convert "Spring 2024" → Date-like string for proper sorting
function semesterToSortable(s: string): string {
  const [term, year] = s.split(' ')
  const termValue = { Spring: '01', Summer: '05', Fall: '09', Winter: '12' }[term] || '00'
  return `${year}-${termValue}`
}

export default function TeachingPage() {
  const dir = path.join(process.cwd(), 'content/teaching')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

  const courses: Course[] = files.map((filename) => {
    const file = fs.readFileSync(path.join(dir, filename), 'utf8')
    const { data } = matter(file)
    return {
      slug: filename.replace(/\.mdx$/, ''),
      title: data.title || filename,
      semester: data.semester || '',
      institution: data.institution || '',
    }
  }).sort((a, b) => 
    semesterToSortable(b.semester).localeCompare(semesterToSortable(a.semester))
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Teaching</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {courses.map(course => (
          <Link
            key={course.slug}
            href={`/teaching/${course.slug}`}
            className="block border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
          >
            <p className="text-sm text-gray-500">{course.semester}</p>
            <h2 className="text-xl font-semibold mb-1">{course.title}</h2>
            <p className="text-sm text-gray-500">{course.institution}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}


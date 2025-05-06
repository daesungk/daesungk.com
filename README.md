# 🧠 Daesung Kim Personal Academic Site

This is a clean, production-ready starter built with **Next.js App Router**, **Tailwind CSS**, **MDX**, and **KaTeX** rendering — designed for academic websites with research, teaching, and blogging sections.

---

## ✨ Features

- 📚 Renders `.mdx` content for pages, blog posts, and teaching materials
- 🧮 KaTeX math rendering with `$...$` and `$$...$$`
- 🎨 Tailwind CSS with custom fonts and dark mode
- 🗂 Simple file-based content structure (`/content`)
- 🚀 Works with **Next.js 15** (App Router)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/daesung-homepage.git
cd daesung-homepage


# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 📁 Folder Structure

```
your-project/
├── app/
│   ├── page.tsx                # Main page rendering `content/mainpage.mdx`
│   ├── layout.tsx              # Global layout with nav + footer
│   ├── globals.css             # Tailwind + KaTeX + highlight.js
│   ├── blog/
│   │   └── [slug]/page.tsx     # Renders MDX blog posts
│   ├── teaching/
│   │   └── [slug]/page.tsx     # Renders MDX teaching pages
│   └── research/page.tsx       # Renders `content/research.mdx`
├── components/
│   └── MarkdownFromRaw.tsx     # Parses + renders raw MDX string with KaTeX
├── content/
│   ├── mainpage.mdx            # Main landing page content
│   ├── research.mdx            # Research section content
│   ├── blog/
│   │   └── first-post.mdx
│   └── teaching/
│       └── 2025-spring-probability.mdx
```

---

## ✍️ Writing Content

### Blog Post: `content/blog/first-post.mdx`

```mdx
---
title: First Post
date: 2024-01-01
---

Euler's identity: $e^{i\pi} + 1 = 0$

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### Teaching Page: `content/teaching/2025-spring-probability.mdx`

```mdx
---
title: Probability and Statistics
institution: GaTech
semester: 2025 Spring
---

### Tentative schedule
| week | date | due  |
| ---  | ---  | ---  |
| 1    | 1/1  | HW 1 |
```

---

## 📐 Styling

Tailwind is preconfigured via `globals.css`. KaTeX and highlight.js styles are included.

```css
@import 'katex/dist/katex.min.css';
@import 'highlight.js/styles/monokai.css';
```

---

## 🛠 Dependencies

```bash
npm install gray-matter unified remark-parse remark-math rehype-katex rehype-highlight remark-rehype rehype-stringify katex
```

---

## 📄 License

MIT — use it freely for personal or academic sites.

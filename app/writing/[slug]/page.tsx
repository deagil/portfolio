import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, formatDate, posts } from "@/lib/posts"
import { contentMap } from "@/lib/content"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Dylan Gilchrist`,
    description: post.description,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const Content = contentMap[slug]
  if (!Content) notFound()

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      {/* Article header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight mb-4">
          {post.title}
        </h1>
        <time
          dateTime={post.date}
          className="text-sm text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
      </header>

      <hr className="border-border mb-12" />

      {/* Article body */}
      <article className="prose max-w-none">
        <Content />
      </article>

      {/* Footer navigation */}
      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
        >
          <span aria-hidden>←</span>
          <span>Back to index</span>
        </Link>
      </footer>
    </main>
  )
}

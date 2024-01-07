import type { APIRoute } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getEntry } from 'astro:content'

export const GET: APIRoute = async ({ params }): Promise<Response> => {
  const slug: string | undefined = params.article

  if (!slug) {
    return new Response(
      JSON.stringify({ error: 'No article' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }
    )
  }

  const article: CollectionEntry<'articles'> | undefined = await getEntry('articles', slug)

  if (!article) {
    return new Response(
      JSON.stringify({ error: 'No article' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }
    )
  }

  return new Response(
    JSON.stringify(article), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

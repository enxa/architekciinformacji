import type { APIRoute } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ params }): Promise<Response> => {
  const tag: string | undefined = params.articles

  if (!tag) {
    return new Response(
      JSON.stringify({ error: 'tag term is missing' }), {
        status: 400, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  const articles: CollectionEntry<'articles'>[] = (await getCollection('articles'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  const tagArticles = articles.filter(article => article.data.tags.includes(tag))

  if (!tagArticles.length) {
    return new Response(
      JSON.stringify({error: 'No tagged articles'}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return new Response(
    JSON.stringify(tagArticles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
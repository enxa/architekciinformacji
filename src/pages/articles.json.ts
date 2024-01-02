import type { APIRoute } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async (): Promise<Response> => {
  const articles: CollectionEntry<'articles'>[] = (await getCollection('articles'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  if (!articles) {
    return new Response(
      JSON.stringify({error: 'No articles'}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return new Response(
    JSON.stringify(articles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
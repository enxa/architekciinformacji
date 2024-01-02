import type { APIRoute } from 'astro'
import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ params }): Promise<Response> => {
  const search: string | undefined = params.articles

  if (!search) {
    return new Response(
      JSON.stringify({ error: 'search term is missing' }), {
        status: 400, 
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  const articles: CollectionEntry<'articles'>[] = (await getCollection('articles'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  const searchArticles = articles.filter(article => {
    const titleMatch: boolean = article.data.title.toLowerCase().includes(search!.toLowerCase())
    const slugMatch: boolean = article.slug.toLowerCase().includes(search!.toLowerCase())
    const bodyMatch: boolean = article.body.toLowerCase().includes(search!.toLowerCase())
    return titleMatch || slugMatch || bodyMatch
  })

  if (!searchArticles.length) {
    return new Response(
      JSON.stringify({error: 'No articles'}), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return new Response(
    JSON.stringify(searchArticles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
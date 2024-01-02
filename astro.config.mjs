import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";


// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte()],
  output: "server",
  adapter: vercel()
});
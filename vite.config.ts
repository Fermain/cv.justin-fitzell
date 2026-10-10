import { frame } from '@fermain/frame/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// The editor's own styles are written with Tailwind, which this compiles.
		tailwindcss(),
		frame({ content: 'src/content', media: 'static/images' }),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
			},
			adapter: adapter(),
			// GitHub Pages serves a project site from /<repo>, which a deploy passes as BASE_PATH.
			// On a domain of its own this is empty.
			paths: { base: (process.env.BASE_PATH ?? '') as '' | `/${string}` }
		})
	]
});

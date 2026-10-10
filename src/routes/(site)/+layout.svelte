<script lang="ts">
	import '../../site.css';
	import { person } from '#lib/content.ts';

	let { children } = $props();
</script>

<svelte:head>
	<title>{person.name} | CV</title>
	<meta name="description" content={person.summary} />
</svelte:head>

{@render children()}

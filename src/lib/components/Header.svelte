<script lang="ts">
	import { media, person, type Person } from '../content.ts';

	// The saved details, or what is being typed in the editor.
	let { entry = person }: { entry?: Person } = $props();
</script>

<header class="header">
	{#if entry.photo}<img class="photo" src={media(entry.photo)} alt="" />{/if}
	<div>
		<h1>{entry.name}</h1>
		<p class="headline">{entry.headline}</p>
	</div>
	<dl class="facts contact">
		{#each entry.contact ?? [] as line, index (index)}
			<div><dt>{line.name}</dt><dd>{line.value}</dd></div>
		{/each}
	</dl>
</header>

<section class="block">
	<h2>Profile</h2>
	<div>
		<p class="summary">{entry.summary}</p>
		{#if entry.details?.length}
			<dl class="facts">
				{#each entry.details as line, index (index)}
					<div><dt>{line.name}</dt><dd>{line.value}</dd></div>
				{/each}
			</dl>
		{/if}
	</div>
</section>

<script lang="ts">
	import { period, type Role } from '../content.ts';

	let { entry }: { entry: Role } = $props();
</script>

<article class="item">
	<p class="when">{period(entry.start, entry.end)}</p>
	<div>
		<h3>{entry.role}</h3>
		<p class="where">{entry.organisation}{#if entry.location}, {entry.location}{/if}</p>
		{#if entry.summary}<p>{entry.summary}</p>{/if}
		{#if entry.highlights?.length}
			<ul>
				{#each entry.highlights as highlight, index (index)}<li>{highlight}</li>{/each}
			</ul>
		{/if}
	</div>
</article>

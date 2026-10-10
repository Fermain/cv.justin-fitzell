<script lang="ts">
	import { references, type References } from '../content.ts';

	let { entry = references }: { entry?: References } = $props();
</script>

{#if entry.people?.length || entry.note}
	<section class="block">
		<h2>References</h2>
		{#if entry.people?.length}
			<dl class="facts">
				{#each entry.people as person, index (index)}
					<div>
						<dt>{person.name}</dt>
						<dd>{person.value}{#if person.contact}<br />{person.contact}{/if}</dd>
					</div>
				{/each}
			</dl>
		{:else}
			<p>{entry.note}</p>
		{/if}
	</section>
{/if}

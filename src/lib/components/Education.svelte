<script lang="ts">
	import { newestFirst, studies, type Study } from '../content.ts';

	let { entries = studies }: { entries?: Study[] } = $props();
</script>

<section class="block">
	<h2>Education</h2>
	<div>
		{#each newestFirst(entries, (study) => study.completed) as study (study.slug)}
			<article class="item">
				<p class="when">{study.completed}</p>
				<div>
					<h3>{study.qualification}</h3>
					<p class="where">{study.institution}</p>
					{#if study.notes}<p>{study.notes}</p>{/if}
				</div>
			</article>
		{/each}
	</div>
</section>

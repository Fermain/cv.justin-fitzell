<script lang="ts">
	import { skills, type Skills } from '../content.ts';

	let { entry = skills }: { entry?: Skills } = $props();
</script>

<section class="block">
	<h2>Skills</h2>
	<dl class="facts">
		{#each entry.groups ?? [] as group, index (index)}
			<div><dt>{group.name}</dt><dd>{(group.items ?? []).join(', ')}</dd></div>
		{/each}
	</dl>
</section>

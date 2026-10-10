<script lang="ts">
	import { newestFirst, roles, type Role as RoleEntry } from '../content.ts';
	import Role from './Role.svelte';

	let { entries = roles }: { entries?: RoleEntry[] } = $props();
</script>

<section class="block">
	<h2>Experience</h2>
	<div>
		{#each newestFirst(entries, (role) => role.start) as entry (entry.slug)}
			<Role {entry} />
		{/each}
	</div>
</section>

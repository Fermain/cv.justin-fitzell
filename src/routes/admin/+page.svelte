<script lang="ts">
	import { Admin, hubStorage } from '@fermain/frame/admin';
	import config from '#lib/frame.config.ts';

	// With a hub configured, edits are saved through it to a draft branch. Without one,
	// they are saved straight to the working tree by the dev server.
	const hub = import.meta.env.VITE_FRAME_HUB;
	const project = import.meta.env.VITE_FRAME_PROJECT;
	const storage = hub && project ? hubStorage({ hub, project }) : undefined;
</script>

<svelte:head>
	<title>Frame</title>
</svelte:head>

<Admin {config} {storage} />

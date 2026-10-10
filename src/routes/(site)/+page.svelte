<script lang="ts">
	import Certificates from '#lib/components/Certificates.svelte';
	import Education from '#lib/components/Education.svelte';
	import Experience from '#lib/components/Experience.svelte';
	import Header from '#lib/components/Header.svelte';
	import References from '#lib/components/References.svelte';
	import Skills from '#lib/components/Skills.svelte';
</script>

<main class="cv">
	<Header />
	<Experience />
	<Education />
	<Certificates />
	<Skills />
	<References />
</main>

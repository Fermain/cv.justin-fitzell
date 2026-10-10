<script lang="ts">
	import { certificates, expired, media, month, newestFirst, type Certificate } from '../content.ts';

	let { entries = certificates }: { entries?: Certificate[] } = $props();

	// A certificate that has run out is kept in the editor and left off the CV.
	const current = $derived(newestFirst(entries, (certificate) => certificate.issued).filter((certificate) => !expired(certificate)));
</script>

{#if current.length}
	<section class="block">
		<h2>Certificates</h2>
		<div>
			{#each current as certificate (certificate.slug)}
				<article class="item">
					<p class="when">{certificate.issued ? month(certificate.issued) : ''}</p>
					<div>
						<h3>{certificate.title}</h3>
						<p class="where">
							{[
								certificate.issuer,
								certificate.number && `no. ${certificate.number}`,
								certificate.expires && `valid to ${month(certificate.expires)}`
							]
								.filter(Boolean)
								.join(', ')}
						</p>
						{#if certificate.image}<a class="scan" href={media(certificate.image)}>View the certificate</a>{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>
{/if}

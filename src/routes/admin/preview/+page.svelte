<script lang="ts">
	// The site's styles, without the rest of the page.
	import '../../../site.css';
	import { Preview } from '@fermain/frame/preview';
	import config from '#lib/frame.config.ts';
</script>

<!-- The same column the page itself is set in. -->
<div class="cv"><Preview {config} /></div>

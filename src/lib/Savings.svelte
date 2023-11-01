<script>
	import TransSelector from './TransSelector.svelte';
	import Stats from './Stats.svelte';
	import SummaryPanel from './SummaryPanel.svelte';

	// per day ticket
	let busCost = 3.5;
	// per hour
	let carCost = 1.2;

    let comp = "bus"

	// nr parking hours
	let hours = 4;

	export let data;
</script>

<TransSelector bind:comp={comp}/>
<SummaryPanel {data} {comp} {busCost} {carCost} {hours}/>
<Stats dataset={data}/>
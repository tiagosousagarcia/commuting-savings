<script>
	import TransSelector from './TransSelector.svelte';
	import Stats from './Stats.svelte';
	import SummaryPanel from './SummaryPanel.svelte';
	import ConfigPanel from './ConfigPanel.svelte';

	// per day ticket
	let busCost = 3.5;
	// per hour
	let carCost = 1.2;

    let comp = "bus"

	// nr parking hours
	let hours = 4;

	export let data;
</script>
<ConfigPanel bind:busCost bind:carCost bind:hours/>
<TransSelector bind:comp/>
<SummaryPanel {data} {comp} {busCost} {carCost} {hours}/>
<Stats dataset={data}/>
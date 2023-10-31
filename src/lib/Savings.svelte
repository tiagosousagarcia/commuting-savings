<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import TransSelector from './TransSelector.svelte';
	import Stats from './Stats.svelte';
	// per day ticket
	let busCost = 3.5;
	// per hour
	let carCost = 1.2;

    let comp = "bus"

	// nr parking hours
	let hours = 4;

	export let data;

	function calculateCost(data, comp) {
        // define cost
        let cost = 0
        if (comp == 'bus'){
            cost = busCost
        } else if(comp == 'car') {
            cost = carCost * hours
        }
		// Create a set of unique days:
		let nrDays = new Set(data.map((entry) => new Date(entry.start_date).toDateString())).size;
		let savings = Number(nrDays * cost);
		return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(savings);
	}

    function getOldestDate(data) {
        // get oldest date
        let oldestDate = data.map((entry) => new Date(entry.start_date));
        oldestDate = oldestDate.sort((a, b) => a-b)
        return oldestDate[0].toLocaleDateString('en-UK')
    }
</script>

<TransSelector bind:comp={comp}/>


<div class="px-6 py-24 sm:py-32 lg:px-8">
	<div class="mx-auto max-w-2xl text-center">
		<p class="text-base font-semibold leading-7">You have saved</p>
		<h2 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{calculateCost(data, comp)}</h2>
		<p class="mt-6 text-lg leading-8 text-gray-600">
			commuting by bike versus commuting by {comp} since {getOldestDate(data)}. What are you going to do with all that extra cash?
		</p>
	</div>
</div>
<Stats/>
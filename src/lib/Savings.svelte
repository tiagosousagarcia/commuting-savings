<script>
	// per day ticket
	let busCost = 3.5;
	// per hour
	let carCost = 1.2;

	// nr parking hours
	let hours = 4;

	export let data;

	function calculateCost(data, cost) {
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

<div class="px-6 py-24 sm:py-32 lg:px-8">
	<div class="mx-auto max-w-2xl text-center">
		<p class="text-base font-semibold leading-7">You have saved</p>
		<h2 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{calculateCost(data, busCost)}</h2>
		<p class="mt-6 text-lg leading-8 text-gray-600">
			commuting by bike versus commuting by bus since {getOldestDate(data)}. What are you going to do with all that extra cash?
		</p>
	</div>
</div>
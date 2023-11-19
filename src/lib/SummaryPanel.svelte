<script>
    export let data
    export let comp
    export let busCost
    export let carCost
    export let hours

    import { page } from '$app/stores'
	let range = $page.url.searchParams.get('range');
    
    function calculateCost(data, comp) {
        // define cost
        let cost = 0
        if (comp == 'bus'){
            cost = Number(busCost)
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

    function getRange(range, data) {
        let range_days = 0;
		switch(range) {
            case 'week':
                range_days = 8;
                break;
            case 'month':
                range_days = 31;
                break;
            case 'three_months':
				range_days = 93;
                break;
            case 'six_months':
				range_days = 186;
                break;
            case 'year':
				range_days = 366;
                break;
            case 'all':
				range_days = -1;
                break
        }
        let today = new Date()
        if (range_days > 0) {
            let priorDate = new Date(new Date().setDate(today.getDate() - range_days));
            return priorDate.toLocaleDateString('en-UK');
        } else {
            return getOldestDate(data)
        }
    }
</script>

<div class="px-6 py-24 sm:py-32 lg:px-8">
	<div class="mx-auto max-w-2xl text-center">
		<p class="text-base font-semibold leading-7">You have saved</p>
		<h2 class="mt-2 text-4xl font-bold tracking-tight text-secondary-900-50-token sm:text-6xl">{calculateCost(data, comp, busCost, carCost, hours)}</h2>
		<p class="mt-6 text-lg leading-8 text-token">
			commuting by bike versus commuting by <span class="font-semilight text-secondary-700-200-token">{comp}</span> since <span class="font-semilight text-secondary-700-200-token">{#if range == null}{getOldestDate(data)}{:else}{getRange(range, data)}{/if}</span>. What are you going to do with all that extra cash?
		</p>
	</div>
</div>
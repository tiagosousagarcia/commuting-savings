<script>
	export let dataset;
	let stats = [
		{value: getDistance(dataset), text: "Miles ridden"}, 
		{value: getTime(dataset), text: "Time on the saddle"}, 
		{value: getTotalRides(dataset), text: "Unique Rides"}, 
		{value: getPercentageRides(dataset), text: "Percentage of commuting days"}, 
		{value: getFastest(dataset), text: "Fastest trip"}, 
		{value: getSlowest(dataset), text: "Slowest trip"}];
	
	function getTotalRides(data) {
		return data.length
	}

	function getDistance(data) {
		let distances = data.map((entry) => entry.distance);
		let totalMeters = distances.reduce((accumulator, currentValue) => {return accumulator + currentValue})
		return Math.round(totalMeters / 1609)
	}

	function getTime(data) {
		let time = data.map((entry) => entry.elapsed_time);
		let totalTime = time.reduce((accumulator, currentValue) => {return accumulator + currentValue})
		return new Date(totalTime * 1000).toISOString().slice(11, 19);
	}

	function getFastest(data) {
		const times = data.map(entry => entry.elapsed_time);
		return new Date(Math.min(...times) * 1000).toISOString().slice(11, 19);
	}

	function getSlowest(data) {
		const times = data.map(entry => entry.elapsed_time);
		return new Date(Math.max(...times) * 1000).toISOString().slice(11, 19);
	}

	function getPercentageRides(data) {
		// get earliest date
		let start = data.map((entry) => new Date(entry.start_date));
		start = start.sort((a, b) => a-b)[0]
		// get date now
		const end = new Date(Date.now())

		// get all possible days in between start and now
		let getDaysArray = function(start, end) {
			for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
				arr.push(new Date(dt));
			}
			return arr;
		};
		const allDays = getDaysArray(start, end)

		// reduce nr of days to only weekdays
		const weekDays = allDays.filter((day) => day.getDay() > 0 && day.getDay() < 6)
		
		return `${Math.round(data.length / weekDays.length * 100)}%`
	}

</script>

<div class="bg-surface-100-800-token py-24 sm:py-32">
	<div class="mx-auto max-w-8xl px-6 lg:px-8">
	  <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-6">
		{#each stats as stat}
			<div class="mx-auto flex max-w-xs flex-col gap-y-4">
				<dt class="text-base leading-7 text-primary-900-50-token">{stat.text}</dt>
				<dd class="order-first text-3xl font-semibold tracking-tight text-secondary-900-50-token sm:text-5xl">{stat.value}</dd>
			</div>
		{/each}
	  </dl>
	</div>
  </div>
  
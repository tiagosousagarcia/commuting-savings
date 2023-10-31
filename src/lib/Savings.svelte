<script>
    // per day ticket
    let busCost = 3.5
    // per hour
    let carCost = 1.2

    // nr parking hours
    let hours = 4

    export let data

    function calculateCost(data, cost) {
        // Create a set of unique days:
        let nrDays = new Set(data.map(entry => new Date(entry.start_date).toDateString())).size
        let savings = Number(nrDays*cost)
        return new Intl.NumberFormat('en-UK', {style: 'currency', currency: 'GBP'}).format(savings)
    }
</script>

<p>You have saved {calculateCost(data, busCost)} by commuting by bike instead of bus</p>
 
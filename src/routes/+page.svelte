<script>
    import {onMount} from 'svelte'
    export let data
    let dataset = data.filteredData
    onMount(async() => {
        console.log(data)
    })
</script>

<ul>
{#each dataset as entry}
    <li>{new Date(entry.start_date).toDateString()}</li>
{/each}
</ul>
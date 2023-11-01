<script>
    import { onMount } from 'svelte'
    onMount(() => {
        window.location = "http://www.strava.com/oauth/authorize?client_id=FAKE&response_type=code&redirect_uri=http://localhost:5173/exchange_token&approval_prompt=force&scope=read"
    })
</script>
<script>
    import { onMount } from 'svelte'
    onMount(() => {
        window.location = "http://www.strava.com/oauth/authorize?client_id=[CLIENT_ID]&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read"
    })
</script>
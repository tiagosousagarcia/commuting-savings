<script>
    import { env } from '$env/dynamic/public'
    import { onMount } from 'svelte'

    onMount(() => {
        window.location = `http://www.strava.com/oauth/authorize?client_id=${env.PUBLIC_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173/exchange_token&approval_prompt=force&scope=activity:read_all`
    })
</script>
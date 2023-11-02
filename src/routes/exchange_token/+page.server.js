import { CLIENT_SECRET } from '$env/static/private'
import { PUBLIC_CLIENT_ID } from '$env/static/public'

export async function load({url, cookies}) {
    let code = url.searchParams.get('code')
    let scope = url.searchParams.get('scope')

    var url = new URL('https://www.strava.com/api/v3/oauth/token'), postparams = {
        client_id: PUBLIC_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
    };
    Object.keys(postparams).forEach(key => url.searchParams.append(key, postparams[key]))
    
    let data = await fetch(url, {method: 'POST', headers: {
        'Content-Type': 'application/json'
    }}).then(response => {
        return response.json()
    })
    cookies.set('access_token', data.access_token, {path: '/'})
    cookies.set('refresh_token', data.refresh_token, {path: '/'})
    cookies.set('expires_at', data.expires_at, {path: '/'})
}
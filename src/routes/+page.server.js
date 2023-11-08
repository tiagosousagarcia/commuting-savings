import { CLIENT_SECRET, REFRESH_TOKEN } from '$env/static/private'
import { PUBLIC_CLIENT_ID } from '$env/static/public'

export async function load({}) {

    var url = new URL('https://www.strava.com/api/v3/oauth/token'), postparams = {
        client_id: PUBLIC_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
    };
    Object.keys(postparams).forEach(key => url.searchParams.append(key, postparams[key]))
    
    let refresh = await fetch(url, {method: 'POST', headers: {
        'Content-Type': 'application/json'
    }}).then(response => {
        return response.json()
    })
    const access_token = refresh.access_token
    
    let data = await fetch('https://www.strava.com/api/v3/athlete/activities', {method: 'GET', headers: {'Authorization': `Bearer ${access_token}`}}).then(function (response) {
        if (response.ok) {
            return response.json()
        }
    })

    let filteredData = data.filter(function(e) {
        return e.commute == true
    })
    
    return {filteredData}
}
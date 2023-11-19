import { CLIENT_SECRET, REFRESH_TOKEN } from '$env/static/private'
import { PUBLIC_CLIENT_ID } from '$env/static/public'

export async function load({params, url}) {

    // Gets nr of days from search params
    let range = 0
    if (url.searchParams.get('range')) {
        switch(url.searchParams.get('range')) {
            case 'week':
                range = 8;
                break;
            case 'month':
                range = 31;
                break;
            case 'three_months':
                range = 93;
                break;
            case 'six_months':
                range = 186;
                break;
            case 'year':
                range = 366;
                break;
            case 'all':
                range = -1;
                break
        }

    } else if (range == 0) {
        range = 31 // in days
    }

    // Gets current access token
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

    // Calculates timestamp for date range
    let today = new Date()
    let priorDate = new Date(new Date().setDate(today.getDate() - range));
    let epoch = priorDate.getTime() / 1000

    // sets up vars to get multiple pages of results
    let page = 1
    let per_page = 200
    let more = true
    let allData = []

    // calls the api until there are no more results to get
    while (more) {
        let fetchUrl = `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${per_page}&after=${epoch}`
        if (range < 0) {
            // if the range is of all time do not include after parameter
            fetchUrl = `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${per_page}`
        }
        let data = await fetch(fetchUrl, {method: 'GET', headers: {'Authorization': `Bearer ${access_token}`}}).then(function (response) {
            if (response.ok) {
                return response.json()
            }
        })
        
        allData.push(...data)

        if (Object.keys(data).length === per_page) {
            page += 1;
        } else {
            more = false
        }
    }

    // filter everything
    let filteredData = allData.filter(function(e) {
        return e.commute == true
    })
    
    return {filteredData}
}
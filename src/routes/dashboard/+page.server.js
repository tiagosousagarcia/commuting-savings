export async function load({fetch, cookies}) {

    const access_token = cookies.get('access_token')

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
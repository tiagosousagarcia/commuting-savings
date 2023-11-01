export async function load({params, url}) {
    let code = url.searchParams.get('code')
    let scope = url.searchParams.get('scope')
    let client_id = 'FAKE'
    let client_secret = 'FAKE'

    var url = new URL('https://www.strava.com/api/v3/oauth/token'), postparams = {
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        grant_type: 'authorization_code'
    };
    Object.keys(postparams).forEach(key => url.searchParams.append(key, postparams[key]))
    
    let response = await fetch(url, {method: 'POST'})

    console.log(response)


}
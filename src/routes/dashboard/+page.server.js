export async function load({fetch}) {
    let rawjson = await fetch(`/sampleData.json`).then(function(response){
        if (response.ok) {
            return response.text();
        }
    })
    let filteredData = JSON.parse(rawjson).filter(function(e) {
        return e.commute == true
    })

    return {filteredData}
}
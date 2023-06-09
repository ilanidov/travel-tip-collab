import { locService } from './loc.service.js'



export const mapService = {
    initMap,
    addMarker,
    panTo,

}
// var glocation = {
//     lat:1,
//     lang:2
// }

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi()
        .then(() => {
            // console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            // console.log('Map!', gMap)
            gMap.addListener("click", (mapsMouseEvent) => {
                let selectedCords = JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                // console.log(selectedCords)
                locService.addPlace(selectedCords)
            })
        })
}






function addMarker(loc) {
    // get last location
    locService.query()
        .then((res) => {
            console.log(res)
            let lastLocation = res[res.length-1]
            console.log(lastLocation)
            var marker = new google.maps.Marker({
                position: lastLocation,
                map: gMap,
                title: 'Hello World!'
            })
            return marker
        })

}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = '' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBh9SrLjy1zDSievS2qBEnvMnrj-cThSao`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
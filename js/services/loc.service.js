import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'


// {id, name, lat, lng, weather, createdAt, updatedAt}
const PLACE_KEY = 'petDB'



export const locService = {
    getLocs,
    getEmptyPlace,
    addPlace,
    save,
    query
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]




function query() {
    return storageService.query(PLACE_KEY)
        // .then(pets => {
        //     if (gFilterBy.txt) {
        //         const regex = new RegExp(gFilterBy.txt, 'i')
        //         pets = pets.filter(pet => regex.test(pet.name))
        //     }
        //     if (gFilterBy.minScore) {
        //         pets = pets.filter(pet => pet.score >= gFilterBy.minScore)
        //     }
        //     return pets
        // })
}









function addPlace(selectedCords) {
    const cords = JSON.parse(selectedCords)
    // console.log(cords)
    const newPlace = locService.getEmptyPlace()
    newPlace.name = prompt('Enter pet name:')
    newPlace.lat = cords.lat
    newPlace.lng = cords.lng
    // console.log(newPlace)

    save(newPlace)
        .then(newPlace => {
            console.log(newPlace)

            // return petService.query()
        })
        .then(pets => renderPets(pets))
}

function renderPets(pets) {
    const petsStr = JSON.stringify(pets, null, 4)
    document.querySelector('.pet-list').innerText = petsStr
}



function save(place) {
    if (place.id) {
        return storageService.put(PLACE_KEY, place)
    } else {
        return storageService.post(PLACE_KEY, place)
    }
}



function getEmptyPlace(name = '', lat, lng) {
    return {
        name,
        lat,
        lng
    }
}



function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}






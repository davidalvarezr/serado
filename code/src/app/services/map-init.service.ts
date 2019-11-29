import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MapInitService {

    map = null;

    constructor() {
    }

    initMap(Map: any) {
        if (this.map === null) {
            this.map = new Map(document.getElementById('map'), {
                // ~Center of Switzerland : 46.853906, 8.245431
                center: {lat: 46.853906, lng: 8.245431},
                zoom: 10,
                disableDefaultUI: true,
            });
        }
        return this.map;
    }
}

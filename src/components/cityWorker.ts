// cityWorker.ts
import { City } from "country-state-city";

self.onmessage = (e) => {
    if (e.data.type === 'LOAD_CITIES') {
        const cities = City.getCitiesOfCountry(e.data.countryCode) || [];
        self.postMessage({
            type: 'CITIES_LOADED',
            cities
        });
    }
};
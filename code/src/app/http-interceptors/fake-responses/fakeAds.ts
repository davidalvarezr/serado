import {Ad} from '../../models/Models';
import {of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

const fakeAds: Ad[] = [
    {
        id: 1,
        title: 'Employée de maison logée',
        location: 'Rue de Montchoisy, 1207 Genève',
        contract: 'CDI, 20h/semaine',
        beginning: 'Janvier 2020',
        coordinates: null,
    },
    {
        id: 2,
        title: 'Dame de compagnie Week-end + Voyages',
        location: 'Route de Tanay, 1296 Coppet',
        contract: 'CDD, 2 mois, 20h/semaine',
        beginning: 'Dès que possible',
        coordinates: null,
    },
]

export const fakeAdsResponse = of(new HttpResponse({status: 200, body: fakeAds}));

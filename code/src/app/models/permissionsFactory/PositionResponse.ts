import {Geoposition} from '@ionic-native/geolocation';

export type PositionResponse = Geoposition | 'NOT_AVAILABLE' | 'NOT_GRANTED';

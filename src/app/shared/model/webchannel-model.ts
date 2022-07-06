import { CountryTwoModel } from "./country-two-model";

export interface WebChannelModel {
    id: number;
    name: string;
    country: CountryTwoModel;
    officialSite: string;
}
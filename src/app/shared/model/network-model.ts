import { CountryModel } from "./country-model";

export interface NetworkModel {
    id: number;
    name: string;
    country: CountryModel;
    officialSite: string;
}
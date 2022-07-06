import { ExternalsModel } from "./externals-model";
import { ImageModel } from "./image-model";
import { LinksModel } from "./links-model";
import { NetworkModel } from "./network-model";
import { RatingModel } from "./rating-model";
import { ScheduleModel } from "./schedule-model";
import { WebChannelModel } from "./webchannel-model";

export interface ShowModel {
    id: number;
        url: string;
        name: string;
        type: string;
        language: string;
        genres: string[];
        status: string;
        runtime?: number;
        averageRuntime?: number;
        premiered: string;
        ended: string;
        officialSite: string;
        schedule: ScheduleModel;
        rating: RatingModel;
        weight: number;
        network: NetworkModel;
        webChannel: WebChannelModel;
        dvdCountry?: any;
        externals: ExternalsModel;
        image: ImageModel;
        summary: string;
        updated: number;
        _links: LinksModel;
}
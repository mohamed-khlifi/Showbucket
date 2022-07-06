import { NextEpisodeModel } from "./next-episode-model";
import { PreviousEpisodeModel } from "./previous-episde-model";
import { SelfModel } from "./self-model";

export interface LinksModel {
    self: SelfModel;
    previousepisode: PreviousEpisodeModel;
    nextepisode: NextEpisodeModel;
}
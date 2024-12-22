import * as SuperdesktopData from "../scenes/scene-Superdesktop.json";
import { Game, NgZone, MockNgZone, Scene, Utilities } from "webfront-graphics-core-engine";
import { GAME_SCENE_NAME, } from "./common-constants";
import { behaviourTypeList } from "./superdesktop-behaviour-type-list";
import { SuperdesktopDataShared } from "./superdesktop-shared";

export interface SuperdesktopProperties {
    imageAsssetPaths: string[];
    languageCode: string;
    ngZone?: NgZone;
    loading?: Loading;
    isDebuggerAllowed?: boolean;
    isDebuggerTraceEnabled?: boolean;
}

interface Loading {
    onLoading?: (() => void);
    onLoadingCompleted?: (() => void);
}

import { Game, MockNgZone, MockNgZoneWithTimeout, Scene } from "webfront-graphics-core-engine";
import { SuperdesktopProperties } from "./superdesktop/superdesktop-game";
import { buildDebugDialog, applyHidden } from "./debug";
// import { GAME_SCENE_NAME } from "./superdesktop/common-constants";

let isSuperdesktopLoaded = false;
let isSuperdesktopReady = false;

const languageSelectedInput = document.querySelector('#languageSelected') as HTMLInputElement;
const loadingDialogInput = document.querySelector('#loadingDialog') as HTMLInputElement;
const loadingProgressInput = document.querySelector('#loadingProgress') as HTMLInputElement;
const loadingInfoInput = document.querySelector('#loadingInfo') as HTMLInputElement;
const canvasContainer = document.querySelector('.canvasContainer') as HTMLElement;


const onLoading = () => {
    (<any> loadingProgressInput).value = Game.instance.totalAssetsLoaded;
    loadingInfoInput.innerHTML = `Loaded ${Game.instance.currentLoadingProgressPercent.toFixed(2)} % (${Game.instance.totalAssetsLoaded} of ${Game.instance.totalAssetsToLoad})`;
}

const onLoadingCompleted = () => {
    (<any> loadingProgressInput).value = Game.instance.totalAssetsLoaded;
    loadingInfoInput.innerHTML = "Loading completed. Please wait.";
}

const prepareLoading = (totalFiles: number) => {
    loadingInfoInput.innerHTML = "";
    (<any> loadingProgressInput).value = 0;
    (<any> loadingProgressInput).max = totalFiles;
    (<any> loadingDialogInput).showModal();
}


const getAssetsNormal = (): string[] => [
    
];

const createSuperdesktop = (): Promise<Scene> => {
    const loading = { onLoading, onLoadingCompleted, };
    const gameProperties: SuperdesktopProperties = {
        imageAsssetPaths:  getAssetsNormal(),
        languageCode: languageSelectedInput.value,
        ngZone: new MockNgZoneWithTimeout(), // new MockNgZone()
        // isDebuggerAllowed: true,
        // isDebuggerTraceEnabled: true,
        loading,
    };

    prepareLoading(gameProperties.imageAsssetPaths.length);
    return buildSuperdesktopGame(gameProperties);
}

let the20BallsToShow: string[];

const main = async () => {
    const scene = await createSuperdesktop(true);
    isSuperdesktopLoaded = true;
    const sizeCanvas = {};
    startSuperdesktopGame(canvasContainer, scene, sizeCanvas, true, "#444477").then(() => {
        
    });

    // buildDebugDialog(false);
    buildDebugDialog();
    applyHidden();
}

main();

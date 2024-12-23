import * as SuperdesktopData from "../scenes/scene-Superdesktop.json";
import { Game, NgZone, MockNgZone, Scene, Utilities, cloneJSONData } from "webfront-graphics-core-engine";
import { GAME_SCENE_NAME, } from "./common-constants";
import { behaviourTypeList } from "./superdesktop-behaviour-type-list";
import { SuperdesktopDataShared } from "./superdesktop-data-shared";

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

export const buildSuperdesktopGame = async (gameProperties: SuperdesktopProperties): Promise<Scene> => {
  if (!gameProperties.ngZone) {
    gameProperties.ngZone = new MockNgZone();
  }

  let utilities: Utilities | undefined = undefined;
  if (gameProperties.loading) {
    utilities = {
      onPercentLoader: gameProperties.loading!.onLoading,
      onLoadingCompleted: gameProperties.loading!.onLoadingCompleted,
    };
  }

  const game: Game = new Game(
    [
      { nameScene: GAME_SCENE_NAME, jsonData: cloneJSONData(SuperdesktopData) },
    ],
    [],
    {
      imageAsssetPaths: gameProperties.imageAsssetPaths,
      particlesConfigJson: [],
      languageCode: gameProperties.languageCode,
      debugProperties: {
          isDebuggerAllowed: !!gameProperties.isDebuggerAllowed,
          isPhysicTraceEnabled: !!gameProperties.isDebuggerTraceEnabled,
      },
      ngZone: gameProperties.ngZone!,
      antialiasEnabled: false,
      pauseOnTabOrWindowChange: true,
      dataShared: new SuperdesktopDataShared(),
      behaviourTypeList,
      utilities,
    }
  );
  return await game.load(GAME_SCENE_NAME);
};

export const startSuperdesktopGame = async (
  divCanvas: HTMLElement,
  superdesktopScene: Scene,
  size: { width?: number; height?: number } = {},
  backgroundColor?: string,
): Promise<void> => {
  // const dataShared = <SuperdesktopDataShared> Game.instance.dataShared;
  await superdesktopScene.start(divCanvas, size, backgroundColor);
  
  divCanvas.onclick = (ev) => console.log('x', ev.x, 'y', ev.y); // TODO: Para mover un objeto.
  divCanvas.ondblclick = (ev) => console.log('DOBLE CLIC'); // TODO: Para abrir un objeto (p.e: lanzar una web en marcador o ver imagen).
};

export const setOnGameFinished = (onGameFinishedCallback: () => void) => {
  (<SuperdesktopDataShared> Game.instance.dataShared).onGameFinishedCallback = onGameFinishedCallback;
}

export const destroySuperdesktop = async (): Promise<void> => {
  await Game.instance.destroy();
};

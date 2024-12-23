import { DataShared } from 'webfront-graphics-core-engine';

export class SuperdesktopDataShared extends DataShared {
    onGameFinishedCallback: undefined | (() => void);
}

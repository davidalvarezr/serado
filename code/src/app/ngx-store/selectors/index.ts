import * as _positionSelectors from './position.selector.js';
import * as _listsSelectors from './lists.selector';
import * as _appSelectors from './app.selector';
import * as _routerSelectors from './router.selector';

export const positionSelectors = _positionSelectors;
export const listsSelectors = _listsSelectors;
export const appSelectors = _appSelectors;
export const routerSelectors = _routerSelectors;

export const selectors = {
    position: positionSelectors,
    lists: listsSelectors,
    app: appSelectors,
    router: routerSelectors,
}

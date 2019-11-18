import * as _positionSelectors from './position.selector.js';
import * as _listsSelectors from './lists.selector';

export const positionSelectors = _positionSelectors;
export const listsSelectors = _listsSelectors;

export const selectors = {
    position: positionSelectors,
    lists: listsSelectors,
}

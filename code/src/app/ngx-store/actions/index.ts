import * as _AppActions from './app.actions';
import * as _PositionActions from './position.actions';
import * as _ListsActions from './lists.actions';

export const AppActions = _AppActions;
export const PositionActions = _PositionActions;
export const ListsActions = _ListsActions;

export const actions = {
    app: AppActions,
    position: PositionActions,
    lists: ListsActions,
}

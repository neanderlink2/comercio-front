import { all } from 'redux-saga/effects';
import account from './account/sagas';


export default function* rootSaga() {
    return yield all([
        account
    ]);
}
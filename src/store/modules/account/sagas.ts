import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { formatError } from '../../../api';
import { LoginActions } from './actions/tryLogin';
import { TryLoginPayload } from './types';

function* tryLogin({ payload }: PayloadAction<TryLoginPayload>) {
    const { login, password, onSuccess, onFailed } = payload;
    try {
        const response = yield call(axios.post, `https://localhost:32768/api/v1/account/login`, { email: login, senha: password });
        yield put(LoginActions.success(response.data));
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (errors) {
        const allErrors = formatError(errors);
        yield put(LoginActions.failed(allErrors));
        if (onFailed) {
            onFailed(allErrors);
        }
    }
}

export default all([
    takeLatest(LoginActions.request.type, tryLogin)
]);
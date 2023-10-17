/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from '@/hooks/redux';

type BoundAsyncThunk<Action extends ActionCreator<any>> = (...args: Parameters<Action>) => ReturnType<ReturnType<Action>>;

type BoundActions<Actions extends ActionCreatorsMapObject> = { [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
  ? BoundAsyncThunk<Actions[key]>
  : Actions[key];
};

export const useActionCreator = < Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

import React, {useEffect} from "react";
import {State, Action, Status} from '../utils'

function useSafeDispatch(dispatch: (...args: any[]) => void) {
  const mountedRef = React.useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => { 
        mountedRef.current = false
    };
  }, []);

  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

function asyncReducer(state: State, action: Action): State {
  switch (action.type) {
    case "pending": {
      return { status: Status.PENDING, data: null, error: null };
    }
    case "resolved": {
      return { status: Status.RESOLVED, data: action.data, error: null };
    }
    case "rejected": {
      return { status: Status.REJECTED, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useAsync(initialState: State) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: Status.IDLE,
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = React.useCallback(
    (promise) => {
      dispatch({ type: "pending" });
      promise.then(
        (data: any) => {
          dispatch({ type: "resolved", data });
        },
        (error: string) => {
          dispatch({ type: "rejected", error });
        }
      );
    },
    [dispatch]
  );

  return {
    error,
    status,
    data,
    run,
  };
}

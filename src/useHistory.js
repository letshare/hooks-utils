import { useReducer, useCallback } from 'react';

const useHistory = initialPresent => {
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        present: initialPresent
    });
  
    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;
  
    // 设置我们的回调函数
    // 使用useCallback来避免不必要的重新渲染
    const undo = useCallback(
        () => {
            if (canUndo) {
                dispatch({ type: 'UNDO' });
            }
        },
        [canUndo, dispatch]
    );
  
    const redo = useCallback(
        () => {
            if (canRedo) {
                dispatch({ type: 'REDO' });
            }
        },
        [canRedo, dispatch]
    );
  
    const set = useCallback(newPresent => dispatch({ type: 'SET', newPresent }), [
        dispatch
    ]);
  
    const clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [
        dispatch
    ]);
  
    // 如果需要，同样可以到处过去和未来的state
    return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};

export default useHistory;
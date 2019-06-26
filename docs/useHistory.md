## useHistory

这个hook可以非常简单的将撤销/重做功能添加到你的应用中。

我们的案例是一个简单的绘画应用。这个例子将会生成一个网格块，你可以单击任何一个块去改变它的颜色，并且通过使用useHistory hook，我们可以在canvas上撤销、重做或者清除所有的更改。

在我们的hook中，我们将使用useRoducer来代替useState储存数据，这些东西应该对任何使用过redux的人都非常的熟悉（查看更多useReducer相关信息尽在官方文档）。这个hook复制了use-undo这个库并有一些细微的变化。因此你可以直接通过npm去安装和使用这个库。

## 使用
```javascript
import { useReducer, useCallback } from 'react';// Usage

function App() {
  const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});

  return (
    <div className="container">
      <div className="controls">
        <div className="title">👩‍🎨 Click squares to draw</div>
        <button onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={clear}>Clear</button>
      </div>

      <div className="grid">
        {((blocks, i, len) => {
          // 生成一个网格块
          while (++i <= len) {
            const index = i;
            blocks.push(
              <div
                // 如果state中的状态为true则给这个块添加active类名
                className={'block' + (state[index] ? ' active' : '')}
                // 根据点击改变块的状态并合并到最新的state
                onClick={() => set({ ...state, [index]: !state[index] })}
                key={i}
              />
            );
          }
          return blocks;
        })([], 0, 625)}
      </div>
    </div>
  );
}// 初始化useReducer中的state

const initialState = {
    // 当我们每次添加新state时，用来储存更新前状态的数组
    past: [],
    // 当前的state值
    present: null,
    // 让我们可以用使用重做功能的，future数组
    future: []};// 根据action处理state的改变const reducer = (state, action) => {
    const { past, present, future } = state;

    switch (action.type) {
        case 'UNDO':
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);

            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            };
        case 'REDO':
            const next = future[0];
            const newFuture = future.slice(1);

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            };
        case 'SET':
            const { newPresent } = action;

            if (newPresent === present) {
                return state;
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            };
        case 'CLEAR':
            const { initialPresent } = action;

            return {
                ...initialState,
                present: initialPresent
            };
    }
};
```
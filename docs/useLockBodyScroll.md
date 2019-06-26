## useLockBodyScroll

有时候当一些特别的组件在你们的页面中展示时，你想要阻止用户滑动你的页面（想一想modal框或者移动端的全屏菜单）。

如果你看到modal框下的内容滚动尤其是当你打算滚动modal框内的内容时，这可能会让人很困惑。

这个hook解决了这个问题。在任意组件内使用这个hook，只有当然这个组件unmount的时候，页面才会被解锁滑动。

## 使用
```javascript
import { useState, useLayoutEffect } from 'react';
// 使用
function App(){
  // modal框的state
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );}function Modal({ title, content, onClose }){
  // 调用hook锁定body滚动
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
```
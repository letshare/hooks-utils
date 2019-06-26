## useMedia

这个hook让你轻易可以在你的component逻辑里使用媒体查询。

在我们的例子中，我们可以根据哪一个媒体查询匹配到了当前屏幕的宽度，并渲染不同的列数。

然后分配图片在列中不同的位置以限制列的高度差（我们并不像希望某一列比剩下的都要长）。 你可以创建一个直接获取屏幕宽度的hook，代替使用媒体查询。但是这个方法会让你更容易在JS和你的Stylesheet共享媒体查询。

```javascript
import { useState, useEffect } from 'react';

function App() {
  const columnCount = useMedia(
    // 媒体查询
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // 列数 （跟上方的媒体查询数组根据下标相关）
    [5, 4, 3],
    // 默认列数
    2
  );

  // 创建一个默认的列高度数组，以0填充
  let columnHeights = new Array(columnCount).fill(0);

  // 创建一个数组用来储存每列的元素，数组的每一项为一个数组
  let columns = new Array(columnCount).fill().map(() => []);

  data.forEach(item => {
    // 获取高度最矮的那一项
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // 添加item
    columns[shortColumnIndex].push(item);
    // 更新高度
    columnHeights[shortColumnIndex] += item.height;
  });

  // 渲染每一列和其中的元素
  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map(column => (
          <div className="column">
            {column.map(item => (
              <div
                className="image-container"
                style={{
                  // 根据图片的长宽比例调整图片容器
                  paddingTop: (item.height / item.width) * 100 + '%'
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```
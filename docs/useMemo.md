## useMemo

React内置了一个叫useMemo的hook，允许你缓存开销大的方法避免它们在每一次render中都被调用。

你可以简单的只传入函数和数组然后useMemo将会只有在其中一个输入改变的情况才会重新计算。

下面在我们的例子中有一个叫computeLetterCount的开销成本大的函数（出于演示目的，我们通过包含 一个完全不必要的大循环来降低速度）。

当前选中的单词发生改变时，你会观察到因为新的单词它需要重新调用computeLetterCount方法而造成的延迟。我们还有一个计数器用来每一次按钮被点击时增加计数。当计数器增加时，你会发现在两次渲染之前没有延迟。这是因为computeLetterCount没有被调用。输入文字并没有改变因此返回的是缓存值。

## 使用
```javascript
import { useState, useMemo } from 'react';
// Usage
function App() {
  // 计数器的state
  const [count, setCount] = useState(0);
  // 追踪我们在数组中想要展示的当前单词
  const [wordIndex, setWordIndex] = useState(0);

  // 我们可以浏览单词和查看字母个数
  const words = ['hey', 'this', 'is', 'cool'];
  const word = words[wordIndex];

  // 返回一个单词的字母数量
  // 人为的使它运行缓慢
  const computeLetterCount = word => {
    let i = 0;
    while (i < 1000000000) i++;
    return word.length;
  };

  // 缓存computeLetterCount，当输入数组的值和上一次运行一样的话，就会返回缓存的值
  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  // 这个方法会是我们增加计数变得延迟，因为我们不得不等开销巨大的方法重新运行。
  //const letterCount = computeLetterCount(word);

  return (
    <div style={{ padding: '15px' }}>
      <h2>Compute number of letters (slow 🐌)</h2>
      <p>"{word}" has {letterCount} letters</p>
      <button
        onClick={() => {
          const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
          setWordIndex(next);
        }}
      >
        Next word
      </button>

      <h2>Increment a counter (fast ⚡️)</h2>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
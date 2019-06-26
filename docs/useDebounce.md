## useDebounce

这个hook允许对任何快速改变的值去抖动。去抖动的值只有当最新的值在指定时间间隔内useDebounce hook没有被调用的情况下才会改变。

比如在下面的例子中我们用来和useEffect配合使用，你可以很容易地确保类似API调用这样的昂贵操作不会被频繁调用。

下面的实例，我们将使用漫威漫画API进行搜索，并且通过使用useDebounce防止API每次按键都被调用而导致你被接口屏蔽。

在线实例 ， hook代码和灵感来自https://github.com/xnimorz/use-debounce

## 使用
```javascript
import { useState, useEffect, useRef } from 'react';
// Usage
function App() {
    // 搜索词
    const [searchTerm, setSearchTerm] = useState('');
    // API搜索结果
    const [results, setResults] = useState([]);
    // 搜索状态 (是否有正在等待的请求)
    const [isSearching, setIsSearching] = useState(false);
    // 对改变搜索词去抖动，只有当搜索词500毫秒内没有发生改变时，才会返回最新的值
    // 目标就是只有当用户停止输入时才会调用API，防止我们太过迅速频繁的调用API
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Effect for API call 
    useEffect(
        () => {
            if (debouncedSearchTerm) {
            setIsSearching(true);
            searchCharacters(debouncedSearchTerm).then(results => {
                setIsSearching(false);
                setResults(results);
            });
            } else {
            setResults([]);
            }
        },
        [debouncedSearchTerm] // 只有当去抖动后的搜索词改变时才会调用
    );

    return (
        <div>
            <input
            placeholder="Search Marvel Comics"
            onChange={e => setSearchTerm(e.target.value)}
            />

            {isSearching && <div>Searching ...</div>}

            {results.map(result => (
            <div key={result.id}>
                <h4>{result.title}</h4>
                <img
                src={`${result.thumbnail.path}/portrait_incredible.${
                    result.thumbnail.extension
                }`}
                />
            </div>
            ))}
        </div>
    );}// API search functionfunction searchCharacters(search) {
    const apiKey = 'f9dfb1e8d466d36c27850bedd2047687';
    return fetch(
        `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
        {
            method: 'GET'
        }
    )
    .then(r => r.json())
    .then(r => r.data.results)
    .catch(error => {
        console.error(error);
        return [];
    });
}
```
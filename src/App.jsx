import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <p>我叫张晓晗</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            点击次数: {count}
          </button>
          <p>
            编辑 <code>src/App.jsx</code> 并保存以测试热更新
          </p>
        </div>
      </main>
    </div>
  )
}

export default App

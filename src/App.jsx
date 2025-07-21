import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LatexEditor from './components/latex_editor/LatexEditor';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <LatexEditor />
      </div>
    </>
  )
}

export default App

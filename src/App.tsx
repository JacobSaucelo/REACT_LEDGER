import { useState } from 'react'
import { Button } from './components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      template
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>test</Button>
    </div>
    </>
  )
}

export default App

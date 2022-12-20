import { useState } from 'react'
import './App.css'

interface LocationProps {
  clientX: number
  clientY: number
}

function App() {

  const [locations, setLocation] = useState<LocationProps[]>([])
  const [undoLocations, setUndoLocation] = useState<LocationProps[]>([])
  
  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    const {clientX, clientY} = e

    setLocation([...locations, {clientX, clientY}])
  }

  function undo() {
    const newLocations = [...locations]
    const undoLocation = newLocations.pop()
    setLocation(newLocations)
    if (!undoLocation) return
    setUndoLocation([...undoLocations, undoLocation])
  }

  function redo() {
   const lastLocation = [...undoLocations]
   const redo = lastLocation.pop();
   if(!redo) return
   setUndoLocation(lastLocation)
   setLocation([...locations, redo])
  }

  return (
    <>
    <button disabled={locations.length === 0} onClick={undo}>Undo</button>
    <button disabled={undoLocations.length === 0} onClick={redo}>Redo</button>
    <div className="App" onClick={getCoordinates}>
      {locations.map((location, index) => {
        return (
          <span key={index} style={{top: location.clientY - 6, left: location.clientX -6, position: 'absolute', borderRadius: '50%', background: 'orange', width: '8px', height: '8px'}}></span>
        )
      })}
    </div>
    </>
  )
}

export default App

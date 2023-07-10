//import { useRef } from 'react'
import { useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect } from 'react'

function App() {
const {movies} = useMovies()
const [query, setQuery] =  useState()
const [error, setError] = useState()

const handleSubmit=(event)=>{
  event.preventDefault()

console.log(query)

  
}

const handleChange=(event)=>{
  setQuery(event.target.value)
}
useEffect(()=>{
if(query === ''){
  setError('La busqueda es al menos de 3 caracteres')
}


},[query])
  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
      <form className='form' onSubmit={handleSubmit}>
      <input name='query' onChange={handleChange} placeholder='Avegeners, Start War, the matrix'/>
      <button type='submit' >Buscar</button>
    </form>
{error && <p>{error}</p>}
      </header>
      <main>
        <Movies movies={movies}/>

      </main>
  
     
    </div>
  )
}

export default App

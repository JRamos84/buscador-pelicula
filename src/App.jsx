//import { useRef } from 'react'
import { useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect, useRef } from 'react'

function useSearch(){
  const [search, updateSearch] = useState()
  const [error, setError] = useState()
  const isFirstInput = useRef(true)
  useEffect(()=>{
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
    if(search === ''){
      setError('La busqueda es al menos de 3 caracteres')
    }
    
    
    },[search])

    return{search, error,updateSearch}
}

function App() {
const {movies} = useMovies()
const {search, error, updateSearch} = useSearch()
const handleSubmit=(event)=>{
  event.preventDefault()
}
const handleChange=(event)=>{
  updateSearch(event.target.value)
}

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
      <form className='form' onSubmit={handleSubmit}>
      <input name='search' onChange={handleChange} placeholder='Avegeners, Start War, the matrix' value={search}/>
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

//import { useRef } from 'react'
import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect, useRef } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState()
  const [error, setError] = useState()
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('La busqueda es al menos de 3 caracteres')
    }
  }, [search])

  return { search, error, updateSearch }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 500),
    [getMovies],
  )

  const handleSort = () => {
    setSort(!sort)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(event.target.value)
    debounceGetMovies({ search })
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="search"
            onChange={handleChange}
            placeholder="Avegeners, Start War, the matrix"
            value={search}
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App

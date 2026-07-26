import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'nxtflix_watch_later'

const WatchLaterContext = createContext(null)


const readStoredList = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const WatchLaterProvider = ({ children }) => {
  const [watchLater, setWatchLater] = useState(readStoredList)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchLater))
  }, [watchLater])

  const isInWatchLater = (id) => watchLater.some((movie) => movie.id === id)

  
  const toggleWatchLater = (movie) => {
    setWatchLater((currentList) => {
      const alreadySaved = currentList.some((saved) => saved.id === movie.id)
      return alreadySaved
        ? currentList.filter((saved) => saved.id !== movie.id)
        : [...currentList, movie]
    })
  }

  return (
    <WatchLaterContext.Provider value={{ watchLater, isInWatchLater, toggleWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  )
}

export const useWatchLater = () => {
  const context = useContext(WatchLaterContext)

  if (!context) {
    throw new Error('useWatchLater must be used inside a WatchLaterProvider')
  }

  return context
}

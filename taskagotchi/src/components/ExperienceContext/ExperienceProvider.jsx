import React, { createContext, useContext, useState, useEffect } from 'react'

const ExperienceContext = createContext()

export function useExperience () {
  return useContext(ExperienceContext)
}

export const ExperienceProvider = ({ children }) => {
  const [experience, setExperience] = useState(() => Number(localStorage.getItem('experience') || 0))
  const [level, setLevel] = useState(() => {
    const storedLevel = localStorage.getItem('level')
    return storedLevel ? Number(storedLevel) : 1
  })

  // Respond to external changes in local storage
  useEffect(() => {
    const syncWithStorage = (event) => {
      if (event.key === 'experience') {
        setExperience(Number(localStorage.getItem('experience') || 0))
      }
      if (event.key === 'level') {
        setLevel(Number(localStorage.getItem('level') || 1))
      }
    }

    window.addEventListener('storage', syncWithStorage)
    return () => {
      window.removeEventListener('storage', syncWithStorage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('experience', experience)
    localStorage.setItem('level', level)
  }, [experience, level])

  const addExperience = amount => {
    setExperience(prev => prev + amount)
  }

  return (
    <ExperienceContext.Provider value={{ experience, level, setExperience, setLevel, addExperience }}>
      {children}
    </ExperienceContext.Provider>
  )
}

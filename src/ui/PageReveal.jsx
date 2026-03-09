import React, { useEffect, useState } from 'react'

export default function PageReveal({ children, loader, delay = 1000 }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (loading) {
    return loader
  }

  return children
}

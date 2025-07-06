"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { fontConfig, fonts, type FontKey } from "@/lib/fonts"

interface FontContextType {
  font: FontKey
  setFont: (font: FontKey) => void
  fontConfig: typeof fontConfig
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [font, _setFont] = useState<FontKey>(() => {
    if (typeof window === "undefined") return fonts[0]

    const savedFont = localStorage.getItem("font") as FontKey
    return fonts.includes(savedFont) ? savedFont : fonts[0]
  })

  useEffect(() => {
    const applyFont = (fontKey: FontKey) => {
      const root = document.documentElement

      // Remove all font classes
      fonts.forEach((f) => {
        root.classList.remove(fontConfig[f].className)
      })

      // Add the selected font class
      root.classList.add(fontConfig[fontKey].className)

      // Set CSS custom property for the current font
      root.style.setProperty("--font-current", `var(${fontConfig[fontKey].variable})`)
    }

    applyFont(font)
  }, [font])

  const setFont = (newFont: FontKey) => {
    localStorage.setItem("font", newFont)
    _setFont(newFont)
  }

  return <FontContext.Provider value={{ font, setFont, fontConfig }}>{children}</FontContext.Provider>
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error("useFont must be used within a FontProvider")
  }
  return context
}

import { Inter, Roboto, Open_Sans, Poppins, Lato } from "next/font/google"
import { GeistSans } from "geist/font/sans"

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
})

export const geistSans = GeistSans

// Font configuration object
export const fontConfig = {
  "geist-sans": {
    name: "Geist Sans",
    font: geistSans,
    variable: "--font-geist-sans",
    className: geistSans.className,
  },
  inter: {
    name: "Inter",
    font: inter,
    variable: "--font-inter",
    className: "font-inter",
  },
  roboto: {
    name: "Roboto",
    font: roboto,
    variable: "--font-roboto",
    className: "font-roboto",
  },
  "open-sans": {
    name: "Open Sans",
    font: openSans,
    variable: "--font-open-sans",
    className: "font-open-sans",
  },
  poppins: {
    name: "Poppins",
    font: poppins,
    variable: "--font-poppins",
    className: "font-poppins",
  },
  lato: {
    name: "Lato",
    font: lato,
    variable: "--font-lato",
    className: "font-lato",
  },
} as const

export type FontKey = keyof typeof fontConfig
export const fonts = Object.keys(fontConfig) as FontKey[]
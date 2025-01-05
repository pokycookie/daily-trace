import { useThemeStore } from '@/stores'
import { darkTheme, lightTheme } from '@/themes/theme'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const mode = useThemeStore((state) => state.mode)

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme() : darkTheme()), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}

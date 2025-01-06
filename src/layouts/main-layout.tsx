import { useThemeStore } from '@/stores'
import { darkTheme, lightTheme } from '@/themes/theme'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { LocalizationProvider } from '@mui/x-date-pickers'

dayjs.locale('ko')

export default function MainLayout() {
  const mode = useThemeStore((state) => state.mode)

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme() : darkTheme()), [mode])

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <CssBaseline />
        <Outlet />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

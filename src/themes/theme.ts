import type { ThemeOptions } from '@mui/material'

import { darkPalette, lightPalette } from './palette'
import { typography } from '@/themes/typography'
import color, { IColor } from '@/configs/color'
import { components } from '@/themes/components'

export const lightTheme = (customColor: IColor = color): ThemeOptions => ({
  palette: {
    mode: 'light',
    ...lightPalette(customColor),
  },
  typography,
  components,
})

export const darkTheme = (customColor: IColor = color): ThemeOptions => ({
  palette: {
    mode: 'dark',
    ...darkPalette(customColor),
  },
  typography,
  components,
})

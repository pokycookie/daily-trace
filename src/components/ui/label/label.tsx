import { Stack, Typography } from '@mui/material'

interface ILabelProps {
  name: string
}

export function Label({ name }: ILabelProps) {
  return (
    <Stack bgcolor={(theme) => theme.palette.background.paper} px={0.5} borderRadius={1}>
      <Typography variant="caption">{name}</Typography>
    </Stack>
  )
}

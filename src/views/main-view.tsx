import CreateTraceForm from '@/components/sections/create-trace-form'
import { Container } from '@mui/material'

export default function MainView() {
  return (
    <Container
      sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CreateTraceForm />
    </Container>
  )
}

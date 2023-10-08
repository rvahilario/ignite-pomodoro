import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

type Props = {}

export function DefaultLayout({}: Props) {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10rem);
  max-width: 70rem;
  margin: 5rem auto;
  padding: 0 2.5rem 2.5rem;
  background: ${({ theme }) => theme['gray-800']};
`

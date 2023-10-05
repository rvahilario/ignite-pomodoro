import styled from 'styled-components'
import igniteLogo from '../assets/ignite-logo.svg'
import { NavLink } from 'react-router-dom'
import { Scroll, Timer } from '@phosphor-icons/react'

type Props = {}

export function Header({}: Props) {
  return (
    <HeaderContainer>
      <img src={igniteLogo} />

      <StyledNav>
        <NavLink to={'/'} title="Timer">
          <Timer size={'1.5rem'} />
        </NavLink>
        <NavLink to={'/history'} title="Historic">
          <Scroll size={'1.5rem'} />
        </NavLink>
      </StyledNav>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5rem;
  margin-top: 3rem;
`

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3rem;
    height: 3rem;

    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    color: ${({ theme }) => theme['gray-100']};

    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme['green-500']};
    }

    &.active {
      color: ${({ theme }) => theme['green-500']};
    }
  }
`

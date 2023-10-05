import React from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

type Props = {}

export function DefaultLayout({}: Props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

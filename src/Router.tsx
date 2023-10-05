import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'

type Props = {}

export function Router({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

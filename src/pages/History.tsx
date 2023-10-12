import { useContext } from 'react'
import styled from 'styled-components'
import { CyclesContext } from '../contexts/CyclesContext'

type HistoryProps = {}

export function History({}: HistoryProps) {
  const { cyclesList } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Time start</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cyclesList.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.taskName}</td>
                <td>{`${cycle.minutesAmount} minutes`}</td>
                <td>2 months ago</td>
                <td>
                  <Status status={'completed'} />
                </td>
              </tr>
            ))}
            <tr>
              <td>task name</td>
              <td>25 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status status={'in_progress'} />
              </td>
            </tr>
            <tr>
              <td>task name</td>
              <td>25 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status status={'interrupted'} />
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 3.5rem;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`

const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th,
    td {
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;
    }

    th {
      background: ${({ theme }) => theme['gray-600']};
      color: ${({ theme }) => theme['gray-100']};

      &:first-child {
        border-top-left-radius: 0.5rem;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 0.5rem;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${({ theme }) => theme['gray-700']};
      color: ${({ theme }) => theme['gray-300']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_TEXT = {
  completed: 'Completed',
  interrupted: 'Interrupted',
  in_progress: 'In progress',
}

const STATUS_COLOR = {
  completed: 'green-500',
  interrupted: 'red-500',
  in_progress: 'yellow-500',
} as const

interface StatusProps {
  status: keyof typeof STATUS_COLOR
}

const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme, status }) => theme[STATUS_COLOR[status]]};
  }

  &::after {
    content: ${({ status }) => `"${STATUS_TEXT[status]}"`};
  }
`

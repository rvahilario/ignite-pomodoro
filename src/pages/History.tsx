import styled from 'styled-components'

type HistoryProps = {}

export function History({}: HistoryProps) {
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
            <tr>
              <td>task name</td>
              <td>25 minutes</td>
              <td>2 months ago</td>
              <td>Completed</td>
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

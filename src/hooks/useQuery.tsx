import { useCallback } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export function useQuery() {
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()
  const clearQuery = useCallback(
    (key: string) => {
      query.delete(key)
      history.replace({
        search: query.toString(),
      })
    },
    [query, history],
  )
  return { query, clearQuery }
}

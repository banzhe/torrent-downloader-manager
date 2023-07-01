import api from '@/request/api.ts'

export const getSessionStatistics = (containerName: string) => {
  return api.post('',
    {
      method: 'session-stats',
      tag: 912313
    },
    {
      __containerName: containerName
    })
}
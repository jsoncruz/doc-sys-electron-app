import React, { useEffect } from 'react'

import { useSetRecoilState } from 'recoil'

import { windowTitle } from '~/global/atoms'

const History: React.FC = () => {
  const setPageTitle = useSetRecoilState(windowTitle)

  useEffect(() => {
    setPageTitle('Histórico de Assinaturas')
  }, [setPageTitle])

  return <div />
}

export default History

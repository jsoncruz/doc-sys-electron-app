import React, { useEffect } from 'react'

import { useSetRecoilState } from 'recoil'

import { windowTitle } from '~/global/atoms'

const TokenConfiguration: React.FC = () => {
  const setPageTitle = useSetRecoilState(windowTitle)

  useEffect(() => {
    setPageTitle('Configuração de Token')
  }, [setPageTitle])

  return <div />
}

export default TokenConfiguration

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { usePdf } from '@mikecousins/react-pdf'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { windowTitle } from '~/global/atoms'
import axios from '~/services/request'

interface NavigationProps {
  LinkDocumento: string;
}

const PDFReader: React.FC = () => {
  const setPageTitle = useSetRecoilState(windowTitle)
  const { state: { LinkDocumento } } = useLocation<NavigationProps>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [PDFUrl, setPDFUrl] = useState<string>()
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState({
    percent: 0,
    status: true
  })

  const { pdfDocument, pdfPage } = usePdf({
    file: PDFUrl ?? LinkDocumento,
    page,
    canvasRef
  })

  useEffect(() => {
    axios
      .get(LinkDocumento, {
        onDownloadProgress: ({ loaded, total }) => {
          const percentage = ((loaded / total) * 100)
          setLoading({
            percent: percentage,
            status: percentage < 99
          })
        }
      })
      .then(({ data }) => {
        const blob = new Blob([data], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        setPDFUrl(url)
      })
      .catch((exception) => {
        throw new Error(exception)
      })
  }, [LinkDocumento, setPageTitle])

  useLayoutEffect(() => {
    setPageTitle('Carregando...')
  }, [setPageTitle])

  useEffect(() => {
    if (loading.status) {
      setPageTitle('Lendo Documento')
    }
  }, [loading.status, setPageTitle])

  if (loading.status) {
    return (
      <h4>{loading.percent}</h4>
    )
  }

  return <canvas ref={canvasRef} />
}

export default PDFReader

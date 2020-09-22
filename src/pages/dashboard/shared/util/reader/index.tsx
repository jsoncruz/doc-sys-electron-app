import React, {
  useCallback,
  useReducer,
  useEffect,
  useState,
  useRef
} from 'react'

import {
  Flex,
  Grid,
  Badge,
  IconButton,
  CircularProgress,
  CircularProgressLabel,
  Box,
  PseudoBox
} from '@chakra-ui/core'
import { usePdf } from '@mikecousins/react-pdf'
import {
  VscArrowSmallLeft,
  VscArrowSmallRight,
  VscZoomOut,
  VscZoomIn
} from 'react-icons/vsc'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { windowTitle } from '~/global/atoms'
import axios from '~/services/request'

import { ReducerProps } from '../../../context'

interface NavigationProps {
  LinkDocumento: string;
  document: string;
}

interface ReducerState {
  file: string;
  page: number;
  scale: number;
}

interface ReducerAction {
  type: 'file' | 'page' | 'scale' | 'reset';
  value: any;
}

const reducer: ReducerProps<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'file':
      return { ...state, file: action.value }
    case 'page':
      return { ...state, page: action.value }
    case 'scale':
      return { ...state, scale: action.value }
    case 'reset':
      return action.value
    default:
      return state
  }
}

const PDFReader: React.FC = () => {
  const { state: { LinkDocumento, document } } = useLocation<NavigationProps>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const setPageTitle = useSetRecoilState(windowTitle)

  const [{ file, page, scale }, dispatch] = useReducer(reducer, {
    file: LinkDocumento,
    page: 1,
    scale: 1
  })

  const [loading, setLoading] = useState({
    percent: 0,
    status: true
  })

  const { pdfDocument } = usePdf({
    file,
    page,
    scale,
    canvasRef
  })

  const totalPages = pdfDocument?.numPages ?? 1

  useEffect(() => {
    axios
      .get(LinkDocumento, {
        onDownloadProgress: async ({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100)
          setLoading({
            percent: percentage,
            status: percentage < 99
          })
        }
      })
      .then(({ data }) => {
        const blob = new Blob([data], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        dispatch({ type: 'file', value: url })
      })
      .catch((exception) => {
        throw new Error(exception)
      })
  }, [LinkDocumento, setPageTitle])

  useEffect(() => {
    if (loading.status) {
      setPageTitle('Carregando...')
    } else if (loading.percent === 100) {
      setPageTitle(`Lendo ${document}`)
    }
    return () => {
      dispatch({
        type: 'reset',
        value: {
          file: LinkDocumento,
          page: 1,
          scale: 1
        }
      })
    }
  }, [LinkDocumento, document, loading.percent, loading.status, setPageTitle])

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      dispatch({ type: 'page', value: page - 1 })
    }
  }, [page])

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      dispatch({ type: 'page', value: page + 1 })
    }
  }, [page, totalPages])

  const handleScaleIn = useCallback(() => {
    if (scale < 1.7) {
      dispatch({ type: 'scale', value: scale + 0.1 })
    }
  }, [scale])

  const handleScaleOut = useCallback(() => {
    if (scale > 0.7) {
      dispatch({ type: 'scale', value: scale - 0.1 })
    }
  }, [scale])

  if (loading.status) {
    return (
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress value={loading.percent} size="70px" color="teal">
          <CircularProgressLabel>{`${loading.percent}%`}</CircularProgressLabel>
        </CircularProgress>
      </Flex>
    )
  }

  return (
    <Grid
      userSelect="none"
      gridTemplateRows="30px 1fr"
      gridTemplateColumns="1fr"
      gridTemplateAreas="
        'badge'
        'canvas'
      "
    >
      <Flex
        gridArea="badge"
        justifyContent="center"
        alignItems="center"
        position="sticky"
        backgroundColor="purple.900"
        top="0"
        zIndex={1}
      >
        <IconButton
          isDisabled={page < 2}
          onClick={handlePreviousPage}
          variant="ghost"
          as={VscArrowSmallLeft}
          aria-label="Left Navigation"
          variantColor="ghost"
          size="xs"
        />
        <Badge
          variant="outline"
          fontFamily="Roboto-Black">
          {`${page} / ${totalPages}`}
        </Badge>
        <IconButton
          isDisabled={page === totalPages}
          onClick={handleNextPage}
          variant="ghost"
          as={VscArrowSmallRight}
          aria-label="Right Navigation"
          variantColor="ghost"
          size="xs"
        />
      </Flex>
      <Grid
        gridArea="canvas"
        gridTemplateRows="1fr"
        gridTemplateColumns="40px 1fr"
        gridTemplateAreas="
          'controls content'
        "
      >
        <Flex gridArea="controls" position="relative" zIndex={2}>
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            height="80px"
            alignItems="center"
            position="sticky"
            top="30px"
          >
            <PseudoBox
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={handleScaleIn}
              _hover={{
                backgroundColor: 'gray.900'
              }}
              _active={{
                backgroundColor: 'purple.500'
              }}
            >
              <Box as={VscZoomIn} size="20px" />
            </PseudoBox>
            <PseudoBox
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={handleScaleOut}
              _hover={{
                backgroundColor: 'gray.900'
              }}
              _active={{
                backgroundColor: 'purple.500'
              }}
            >
              <Box as={VscZoomOut} size="20px" />
            </PseudoBox>
          </Flex>
        </Flex>
        <Flex gridArea="content" justifyContent="center">
          <canvas ref={canvasRef} />
        </Flex>
      </Grid>
    </Grid>
  )
}

export default PDFReader

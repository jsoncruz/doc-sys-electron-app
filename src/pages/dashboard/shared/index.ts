import { AiFillFilePdf } from 'react-icons/ai'
import { HiDocumentDuplicate, HiDocument } from 'react-icons/hi'
import { IoIosAlert } from 'react-icons/io'

import Avulsos from './container/avulsos'
import Contratos from './container/contratos'
import Documentos from './container/documentos'
import Empenhos from './container/empenhos'

export { Avulsos, Contratos, Empenhos, Documentos }

export const headers = [
  {
    area: 'titulo-documento',
    title: 'Documentos',
    icon: AiFillFilePdf
  },
  {
    area: 'titulo-contrato',
    title: 'Contratos',
    icon: HiDocumentDuplicate
  },
  {
    area: 'titulo-empenho',
    title: 'Empenhos',
    icon: IoIosAlert
  },
  {
    area: 'titulo-avulso',
    title: 'Avulsos',
    icon: HiDocument
  }
]

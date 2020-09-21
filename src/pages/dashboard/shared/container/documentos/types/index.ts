import React from 'react'

import { IconButtonProps } from '@chakra-ui/core'

export interface DocumentosProps {
  DtSolicitacao: string;
  Situacao: string;
  NomeMotivo: string;
  Documento: string;
  CodigoTramitacao: number;
  CodigoAssinador: number;
  LocalFisico: string;
  NoProcesso: string;
  CodigoMotivo: number;
  NomeMotivoFuturo: string;
  Vistado: null | string;
  Status: 'S' | 'N';
  NoDocumento: string;
}

export interface PendingSubscriptions {
  Nome: string;
  Cargo: string;
  Status: 'S' | 'N';
}

export type MultiplePendingSubscriptions = Array<PendingSubscriptions> | undefined;

export interface FetchPendingSubscriptionsProps extends IconButtonProps {
  service: string;
  tramite: number;
}

export interface ContextProps {
  pending: MultiplePendingSubscriptions;
  setPending: React.Dispatch<React.SetStateAction<MultiplePendingSubscriptions>>
  document: DocumentosProps[] | undefined;
  setDocument: React.Dispatch<React.SetStateAction<DocumentosProps[] | undefined>>
}

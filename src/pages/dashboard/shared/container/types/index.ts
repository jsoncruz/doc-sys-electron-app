import { IconButtonProps } from '@chakra-ui/core'

export interface PendingSubscriptions {
  Nome: string;
  Cargo: string;
  Status: 'S' | 'N';
}

export type MultiplePendingSubscriptions = Array<PendingSubscriptions> | undefined;

export interface FetchPendingSubscriptionsProps <T = any> extends IconButtonProps {
  service: string;
  current: T;
}

export interface PDFLinkageProps {
  LinkDocumento: string
}

export interface TokenProps {
  pass: string
}

export interface ResponseOutput {
  codigoSituacao: number;
  nomeSituacao: string;
}

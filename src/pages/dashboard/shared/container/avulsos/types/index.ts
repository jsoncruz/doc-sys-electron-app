import React from 'react'

export interface APIProps {
  NomeMotivo: string;
  CodigoMotivo: number;
  NomeMotivoFuturo: string;
  NomeEmpresa: string;
  CodigoUop: number;
  TpDocumento: number;
  AnoDocumento: number;
  NoDocumento: number;
  DtSolicitacao: string;
  NoDocumentoCompleto: string;
  NomeTipo: string;
  Status: 'S' | 'N';
  CodigoAssinador: number;
  CodigoDocumentoAvulso: number;
}

export interface ContextProps {
  documents: APIProps[] | undefined;
  setDocuments: React.Dispatch<React.SetStateAction<APIProps[] | undefined>>;
  revalidate: () => Promise<boolean>;
  error: any
}

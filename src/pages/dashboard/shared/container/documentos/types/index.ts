import React from 'react'

export interface APIProps {
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

export interface ContextProps {
  documents: APIProps[] | undefined;
  setDocuments: React.Dispatch<React.SetStateAction<APIProps[] | undefined>>;
  revalidate: () => Promise<boolean>;
  error: any
}

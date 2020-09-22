import React from 'react'

export interface APIProps {
  DtSolicitacao: string;
  NomeMotivo: string;
  Documento: string;
  CodigoMotivo: number;
  NomeMotivoFuturo: string;
  NoEmpenho: string;
  Cargo: string | null;
  NoProcesso: string;
  CodigoAssinador: number;
  LocalFisico: string;
  NomeEmpresa: string;
  Vistado: string | null;
  Status: 'S' | 'N';
}

export interface ContextProps {
  documents: APIProps[] | undefined;
  setDocuments: React.Dispatch<React.SetStateAction<APIProps[] | undefined>>;
  revalidate: () => Promise<boolean>;
  error: any
}

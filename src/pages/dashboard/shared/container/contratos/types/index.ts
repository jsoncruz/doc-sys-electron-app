import React from 'react'

export interface APIProps {
  DtSolicitacao: string;
  NomeMotivo: string;
  Documento: string;
  CodigoAssinador: number;
  LocalFisico: string;
  NoProcesso: string;
  CodigoMotivo: number;
  NomeMotivoFuturo: string;
  CodigoTipo: number;
  Tipo: string;
  NoContrato: string;
  NoInstrumento: number;
  NomeEmpresa: string;
  Numero: number;
  Ano: number;
  Vistado: string | null;
  Status: 'S' | 'N';
}

export interface ContextProps {
  documents: APIProps[] | undefined;
  setDocuments: React.Dispatch<React.SetStateAction<APIProps[] | undefined>>;
  revalidate: () => Promise<boolean>;
  error: any
}

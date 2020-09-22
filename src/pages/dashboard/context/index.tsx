import React, { createContext, useReducer } from 'react'

export interface ReducerProps<S = any, A = any> {
  (state: S, action: A): S;
}

interface ReducerAction {
  type: 'documentos' | 'contratos' | 'empenhos' | 'avulsos' | 'reset';
  value: number;
}

interface ContextProps {
  documentos: number;
  contratos: number;
  empenhos: number;
  avulsos: number;
  dispatch: React.Dispatch<ReducerAction>
}

type ReducerActionProps = Omit<ContextProps, 'dispatch'>

const initialState = {
  documentos: 0,
  contratos: 0,
  empenhos: 0,
  avulsos: 0
}

export const DashboardContext = createContext<ContextProps>(initialState as ContextProps)

const reducer: ReducerProps<ReducerActionProps, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'documentos':
      return { ...state, documentos: action.value }
    case 'contratos':
      return { ...state, contratos: action.value }
    case 'empenhos':
      return { ...state, empenhos: action.value }
    case 'avulsos':
      return { ...state, avulsos: action.value }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const DashboardProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DashboardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider

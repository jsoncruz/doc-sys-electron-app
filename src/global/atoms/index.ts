import { atom } from 'recoil'

export const windowTitle = atom({
  key: 'WindowTitle',
  default: 'DOC-SYS'
})

export const drawerMenuState = atom({
  key: 'DrawerMenuIsOpened',
  default: false
})

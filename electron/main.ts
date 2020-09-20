import { app, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import * as path from 'path'
import * as url from 'url'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    frame: false,
    resizable: false,
    transparent: true,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      navigateOnDragDrop: true,
      allowRunningInsecureContent: true
    }
  })

  mainWindow.setMenuBarVisibility(false)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
  })

app.allowRendererProcessReuse = true

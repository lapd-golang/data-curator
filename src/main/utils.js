var ipc = require('electron').ipcMain
var file_formats = require('../renderer/file-actions.js').formats
let path = require('path')

export function createWindow() {
  let mainWindow = new BrowserWindow({width: 800, height: 600})
  console.log('browser window id is: ' + mainWindow.id)

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
  mainWindow.loadURL(winURL)
  mainWindow.title = 'Data-curator'
  mainWindow.format = file_formats.csv
  mainWindow.on('closed', function() {
    mainWindow = null
  })

  mainWindow.on('resize', function() {
    mainWindow.webContents.send('resized')
  })

  mainWindow.on('close', function() {
    console.log(mainWindow.webContents.send('destroyDb'))
  })

  return mainWindow
}

export function createWindowTab() {
  console.log('...at initial creating tabs')
  var window = BrowserWindow.getFocusedWindow()
  if (window == null) {
    window = createWindow()
  } else {
    window.webContents.send('addTab')
  }
}

export function enableSave() {
  var item = Menu.getApplicationMenu().items[1].submenu.items[5]
  item.enabled = true
}

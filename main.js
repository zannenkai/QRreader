const { app, BrowserWindow ,ipcMain , clipboard ,shell  } = require('electron');
const path = require('path');
const jsqr = require('jsqr');


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  mainWindow.loadFile('index.html');
  mainWindow.setPosition(1000, 0);
  // mainWindow.webContents.openDevTools()

  mainWindow.webContents.setWindowOpenHandler(details =>{
    shell.openExternal(details.url);
    return { action: "deny" };
  });
  
  ipcMain.on('reload', () => {
    mainWindow.reload();
  })
  
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
})

ipcMain.handle('getImg', async (event, ...args) => {
  return clipboard.readImage().toPNG();
})
ipcMain.handle('getQrValue', async (event, data,width, height) => {
  let code = jsqr(data, width, height);
  if(code){
    return code.data;
  }else{
    return 0;
  }
})

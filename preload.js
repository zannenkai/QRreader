const {contextBridge ,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
  'myApi', {
    getImg: async () => await ipcRenderer.invoke('getImg'),
    getQrValue: async (...args) => await ipcRenderer.invoke('getQrValue', ...args),
    reload: () => ipcRenderer.send('reload'),
})

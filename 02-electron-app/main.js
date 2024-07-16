import { app, BrowserWindow } from 'electron';
import { appPort, myExpress } from './app.js';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  });

  /* mainWindow.loadURL(`http://localhost:${appPort}/angular`); */
  mainWindow.loadURL(`http://localhost:4200`);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  myExpress.start()
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});



const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    title: "TeoriFri",
    width: 1440,
    height: 900,
    minWidth: 1050,
    minHeight: 680,
    center: true,
    show: false,
    backgroundColor: "#fcf9fd",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (_event, errorCode, errorDescription, validatedURL) => {
      console.error(
        "TeoriFri kunne ikke indlæses:",
        errorCode,
        errorDescription,
        validatedURL
      );
    }
  );

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch((error) => {
      console.error("Kunne ikke åbne index.html:", error);
    });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

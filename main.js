const electron = require("electron"),
    path = require("path"),
    url = require("url");

const { app, BrowserWindow } = electron;

let mainWindow;

const  createWindow = () => {
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        resizable: false,
        title: "Nomadcoin Wallet"
    });

    const ENV = process.env.ENV;
    console.log(ENV);
    if(ENV === "dev"){
        console.log('env is dev');
        mainWindow.loadURL("http://localhost:3000");
    } else {
        console.log('env is not dev');
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, "uidev/build/index.html"),
                protocol: "file",
                slashes: true
            })
        );
    }

    mainWindow.on("closeed", () => {
        mainWindow = null;
    });
}

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

app.on("activate", () => {
    if(mainWindow === null){
        createWindow();
    }
});

app.on("ready", createWindow);




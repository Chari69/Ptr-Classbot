// Copyright (c) ChariArch 2021. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

const puppeteer = require('puppeteer-extra');

// Plugin de Puppeteer, es necesario para poder iniciar sesion en Google.
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const headless = !process.argv.includes('-h');

// Leer el archivo de configuracion
const fs = require('fs');
var cfg = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

// Inicia el navegador + puppeter (bot)
puppeteer.launch({
    headless: headless,
    executablePath: 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
}).then(async browser => {

    console.log('[BOT] Iniciando el navegador EDGE');
    const page = await browser.newPage();

    // Iniciar sesion en Google
    console.log(`[BOT] Iniciando Sesion en Google (${cfg.cuentaGoogle.correo})`);

    await page.goto('https://accounts.google.com/signin/v2/identifier');

    await page.waitForSelector('#identifierId');
    await page.type('#identifierId', cfg.cuentaGoogle.correo);
    await page.click('#identifierNext');

    await page.waitForSelector('#password input[type="password"]', { visible: true });
    await page.type('#password input[type="password"]', cfg.cuentaGoogle.contraseña, { delay: 5 });
    await page.click('#passwordNext');

    console.log('[BOT] Sesion de Google Iniciada.');
    await page.waitFor(2000);

    // Colocar asistencia en Classroom
    console.log('[BOT] Abriendo Classroom.');
    const classroom = await browser.newPage();
    await classroom.goto('https://classroom.google.com/c/MjgxMzMwNjI0OTU5', { waitUntil: 'networkidle0' });

    const asistencia = await classroom.$x('//*[@id=":1.t"]');
    await asistencia[0].type(`${cfg.mensaje}`);

    await classroom.keyboard.press('Tab');
    await classroom.keyboard.press('Enter');

    // Tomar screenshot de la asistencia (historial) (WIP)
    await page.waitFor(2000);
    var tiempo = Date.now();
    await classroom.screenshot({ path: `historial/${tiempo}.png` });
    console.log('[BOT] Mensaje de asistencia colocado. Se ha dejado una screenshot en la carpeta del programa para que puedas confirmar.');

    await browser.close();
});

process.on('unhandledRejection', (err, p) => { }); // No mas errores pajuos
// Copyright (c) ChariArch 2021. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

const schedule = require('node-schedule');
const colors = require('colors');
const { iniciarClase } = require('./core/Core.js');

// Leer el archivo de configuracion
const fs = require('fs');
var cfg = JSON.parse(fs.readFileSync('config.json', 'utf-8'));


// Bienvenida al script
console.log(' _____   _____   _____         _____   _____   _____  '.magenta);
console.log('|  _  \\ |_   _| |  _  \\       |  _  \\ /  _  \\ |_   _| '.magenta);
console.log('| |_| |   | |   | |_| |       | |_| | | | | |   | |   '.magenta);
console.log('|  ___/   | |   |  _  /       |  _  { | | | |   | |   '.magenta);
console.log('| |       | |   | | \\ \\       | |_| | | |_| |   | |   '.magenta);
console.log('|_|       |_|   |_|  \\_\\      |_____/ \\_____/   |_|   '.magenta);
console.log('');
console.log('                              '.bgBlack + 'Creado por Chari69#1010'.white.bgCyan);
console.log('------------------------------------------------------');


// Ranura para testeos, esto da un poco igual.
if (cfg.testmode.enabled === true) {
    iniciarClase('PTR-TEST', cfg.testmode.url);
};

// HORARIO DE CLASES (por orden)
// Lunes a las 8:10 AM
const id1 = schedule.scheduleJob({ hour: 8, minute: 10, dayOfWeek: 1 }, function () {
    iniciarClase('MATEMATICAS', 'https://classroom.google.com/c/MzQwNzg0ODU0MjRa');
});

// Martes a las 8:10 AM
const id2 = schedule.scheduleJob({ hour: 8, minute: 10, dayOfWeek: 2 }, function () {
    iniciarClase('ORIENTACION', 'https://classroom.google.com/c/MTUwNjk5MjIyNjM3');
});

// Miercoles a las 8:10 AM
const id3 = schedule.scheduleJob({ hour: 8, minute: 10, dayOfWeek: 3 }, function () {
    iniciarClase('GHC', 'https://classroom.google.com/c/MTQ5NTUwMTQwMTMw');
});

// Miercoles a las 11:35 AM
const id4 = schedule.scheduleJob({ hour: 11, minute: 35, dayOfWeek: 3 }, function () {
    iniciarClase('QUIMICA', 'https://classroom.google.com/c/MTc2OTgzMTMzMDgx');
});

// Jueves a las 8:10 AM
const id5 = schedule.scheduleJob({ hour: 8, minute: 10, dayOfWeek: 4 }, function () {
    iniciarClase('CASTELLANO', 'https://classroom.google.com/c/MTQ5ODQ5NTE4NDEy');
});

// Jueves a las 11:35 AM
const id6 = schedule.scheduleJob({ hour: 11, minute: 35, dayOfWeek: 4 }, function () {
    iniciarClase('FISICA', 'https://classroom.google.com/c/OTExNTIyNDc3NzJa');
});

// Viernes a las 8:05 AM
const id7 = schedule.scheduleJob({ hour: 8, minute: 5, dayOfWeek: 5 }, function () {
    iniciarClase('BIOLOGIA', 'https://classroom.google.com/c/MTQ1NDgyOTUyOTIw');
});

process.on('unhandledRejection', (err, p) => { }); // No mas errores pajuos
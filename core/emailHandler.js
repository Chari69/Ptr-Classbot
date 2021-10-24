// Copyright (c) ChariArch 2021. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

function emailHandler(nprof, classemail) {
    const imaps = require('imap-simple');

    // Leer el archivo de configuracion
    const fs = require('fs');
    var cfg = JSON.parse(fs.readFileSync('../config.json', 'utf-8'));

    // Valores de configuracion del cliente de correo
    const config = {
        imap: {
            user: cfg.cuentaGoogle.correo,
            password: cfg.cuentaGoogle.contraseña,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            authTimeout: 50000
        }
    };

    imaps.connect(config).then(function (connection) {
        connection.openBox('INBOX').then(function () {
            // Fetch emails from the last 24h
            var delay = 1 * 3600 * 1000;
            var yesterday = new Date();
            yesterday.setTime(Date.now() - delay);
            yesterday = yesterday.toISOString();
            var searchCriteria = ['SEEN', ['SINCE', yesterday]];
            var fetchOptions = {
                bodies: ['HEADER.FIELDS (FROM SUBJECT)', 'TEXT'],
                markSeen: false
            };

            // retrieve only the headers of the messages
            return connection.search(searchCriteria, fetchOptions).then(function (results) {
                var subjects = results.map(function (res) {
                    return res.parts.filter(function (part) {
                        return part.which === 'HEADER.FIELDS (FROM SUBJECT)';
                    })[0].body.subject[0];
                });

                var putamierda = results.map(function (res) {
                    return res.parts.filter(function (part) {
                        return part.which === 'HEADER.FIELDS (FROM SUBJECT)';
                    })[0].body;
                });

                console.log(putamierda)

                var from = results.map(function (res) {
                    return res.parts.filter(function (part) {
                        return part.which === 'HEADER.FIELDS (FROM SUBJECT)';
                    })[0].body.from[0];
                });

                console.log(subjects);

                var xd = putamierda.from

                console.log(xd)

                var filtro = xd.filter(s => s.includes('asistencia'));
                var filtro2 = from.filter(s => s.includes(`"${nprof} (Classroom)" <${classemail}>`));

                filtro2 += filtro

                console.log(filtro2)

                console.log(filtro.length)
                console.log(filtro2)

                if (filtro.length >= 1 && filtro2 === true) {
                    console.log("si hay");
                } else if (filtro.length === 0) {
                    console.log("no hay")
                } else {
                    console.log("que wea")
                }

            })
        })
    })
};

emailHandler("Karthus2020 lol", "no-reply+548a5d9a@classroom.google.com")

module.exports = { emailHandler };
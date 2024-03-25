#!/usr/bin/env node

const fs = require('fs');

const BASEURL = 'https://mellonscholarlycommunication.github.io/service_node/';

const dir = process.argv[2];

if (!dir) {
    console.log('usage: mkindex.js dir');
    process.exit(1);
}

mkIndex(dir);

function mkIndex(dir) {
    const ls = fs.readdirSync(dir);
   
    const parts = [];
    for (let i = 0 ; i < ls.length ; i++) {
        const path = `${dir}/${ls[i]}`;
        if (fs.lstatSync(path).isDirectory()) {
            mkIndex(path);           
        }

        parts.push(path);
    }

    const sdir = dir.replaceAll(/.*\//g,'');
    let html = `
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/mvp.css"> 
  </head>
  <body>
   <h1>${sdir}</h1>
   <ul>
`;

    parts.forEach( (part) => {
        const spart = part.replaceAll(/.*\//g,'');
        html += `<li><a href="${BASEURL}${part}">${spart}</a></li>\n`;
    });
    html += `
   </ul>
  </body>
</html>
`;
    console.log(`writing ${dir}/index.html`);
    fs.writeFileSync(`${dir}/index.html`,html);
}
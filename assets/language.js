/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('PANCHI-public');
const build = PANCHI.build
const fs = require('fs');
const chalk = require('chalk');

if (fs.existsSync('./language/' + build.LANG + '.json')) {
    console.log(
        chalk.green.bold('🌐 Loading ' + build.LANG + ' language..')
    );

    var json = JSON.parse(fs.readFileSync('./language/' + build.LANG + '.json'));
} else {
    console.log(
        chalk.red.bold('You entered an invalid language. English language was chosen.')
    );

    var json = JSON.parse(fs.readFileSync('./language/EN.json'));
}

function getString(file) {
    return json['STRINGS'][file];
}

module.exports = {
    language: json,
    getString: getString
}
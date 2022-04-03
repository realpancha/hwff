/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Coded by : Sasmitha (Sinhalaya Creator)
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const _PANCHI = PANCHI.panel

const Language = require('../language');
const Lang = Language.getString('helper');

PANCHI.operate({ pattern: 'helper ?(.*)', fromMe: true, desc: Lang.DESC, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const help_CMD = input[1]
    await _PANCHI.helper( PANCHIMSG, help_CMD, Lang )
}));
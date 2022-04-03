/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.EhiDL

const Language = require('../language');
const Lang = Language.getString('unlimiteddata');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true


PANCHI.operate({pattern: 'ehi', fromMe: Work_Mode, desc: Lang.ehi_desc,  deleteCommand: false}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiMenu( PANCHIMSG, Lang )
}));


// ==============EHI FUNCTIONS======================
PANCHI.operate({pattern: 'qaehiinfo', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiInfo( PANCHIMSG, Lang )
}));

PANCHI.operate({pattern: 'qaehihelp', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiHelp( PANCHIMSG, Lang )
}));

PANCHI.operate({pattern: 'qaehidown', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiFiles( PANCHIMSG )
}));

PANCHI.operate({pattern: 'qahttpapp', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiApp( PANCHIMSG )
}));

PANCHI.operate({pattern: 'qaallehi', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiPages( PANCHIMSG )
}));

PANCHI.operate({pattern: 'qaehipgone', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiPage01( PANCHIMSG )
}));

PANCHI.operate({pattern: 'qaehipgtwo', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiPage02( PANCHIMSG )
}));

PANCHI.operate({pattern: 'qaehipgthree', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.ehiPage03( PANCHIMSG )
}));
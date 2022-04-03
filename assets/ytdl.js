/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('queenamdi-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.youtube
const Language = require('../language');
const Lang = Language.getString('dl-video');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true


//===================SONG===================
PANCHI.operate({ pattern: 'qaytsong ?(.*)', fromMe: Work_Mode,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytLink = input[1]
    await _PANCHI.songType( PANCHIMSG, ytLink )
}));

PANCHI.operate({ pattern: 'qasongdoc ?(.*)', fromMe: Work_Mode,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytLink = input[1]
    await _PANCHI.songDOC( PANCHIMSG, ytLink, Lang )
}));

PANCHI.operate({ pattern: 'qasongaudio ?(.*)', fromMe: Work_Mode,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytLink = input[1]
    await _PANCHI.songAUDIO( PANCHIMSG, ytLink, Lang )
}));
//==========================================

//===================VIDEO===================
PANCHI.operate({ pattern: 'qaytvideo ?(.*)', fromMe: Work_Mode,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytLink = input[1]
    await _PANCHI.videoType( PANCHIMSG, ytLink )
}));

PANCHI.operate({ pattern: 'qavideohd ?(.*)', fromMe: Work_Mode,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytLink = input[1]
    await _PANCHI.video720( PANCHIMSG, ytLink, Lang )
}));

PANCHI.operate({ pattern: 'qavideosd ?(.*)', fromMe: Work_Mode,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytLink = input[1]
    await _PANCHI.video360( PANCHIMSG, ytLink, Lang )
}));
//==========================================
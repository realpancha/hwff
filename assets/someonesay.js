/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.misc
const { MessageType } = require('@blackamda/queenamdi-web-api');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

var NEED_WORD = ''
if (Build.LANG == 'SI') NEED_WORD = '*ඔබ වචන ඇතුළත් කළ යුතුය!*'
if (Build.LANG == 'EN') NEED_WORD = '*Please enter words!*'

var DESC = ''
if (Build.LANG == 'SI') DESC = 'කවුරුහරි කියන පරිදි ඔබේ පෙළ සකසන්න.'
if (Build.LANG == 'EN') DESC = 'Make your text as someone says.'
PANCHI.operate({pattern: 'someonesay ?(.*)', fromMe: Work_Mode, desc: DESC, dontAddCommandList: false, deleteCommand: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const txt = input[1]
    
    if (txt === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});

    await _PANCHI.someoneSay( PANCHIMSG, txt )
}));
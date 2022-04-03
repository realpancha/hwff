/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const {FancyText, fancyList} = require('fancy-PANCHI-sew');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const {MessageType} = require('@blackamda/queenamdi-web-api');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('font');


PANCHI.operate({ pattern: 'fancy ?(.*)', fromMe: Work_Mode, desc: Lang.FONT_DESC,  deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.NEED_WORD,MessageType.text, {quoted: PANCHIMSG.data});

    var list = await fancyList(input[1])
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, list, MessageType.listMessage, {quoted: PANCHIMSG.data})
}));

PANCHI.operate({ pattern: 'textfancy ?(.*)', fromMe: Work_Mode, deleteCommand: false, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    var text = input[1].split('////')[1]
    var type = input[1].split('////')[0] 
    var out = await FancyText(text)
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, out[type], MessageType.text, {quoted: PANCHIMSG.data})
}));
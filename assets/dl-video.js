/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.dl_video
const { MessageType } = require('@blackamda/queenamdi-web-api');

const Language = require('../language');
const Lang = Language.getString('dl-video');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true


// ==================INSTAGRAM==================
PANCHI.operate(
    { pattern: 'ig ?(.*)', fromMe: Work_Mode, deleteCommand: false, desc: Lang.IG_DESC }, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const iglink = input[1]
    if (iglink === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});
    
    var igvideo = await PANCHI.igDownloader(iglink)
    await _PANCHI.igDL( PANCHIMSG, igvideo, Lang )
}));
// ============================================

// ==================FACEBOOK==================
PANCHI.operate(
    { pattern: 'fb ?(.*)', fromMe: Work_Mode, deleteCommand: false, desc: Lang.FBDESC }, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const fbLink = input[1]
    if (!fbLink) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.NEED_WORD,MessageType.text, {quoted: PANCHIMSG.data});

    await _PANCHI.fbDL( PANCHIMSG, fbLink, Lang )
}));
// ============================================

// ==================YOUTUBE===================
PANCHI.operate(
    { pattern: 'yt ?(.*)', fromMe: Work_Mode,  deleteCommand: false, desc: Lang.YTDESC }, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const ytkeyword = input[1]
    if (!ytkeyword) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.NEED_VIDEO,MessageType.text, {quoted: PANCHIMSG.data});

    await _PANCHI.ytDL( PANCHIMSG, ytkeyword, Lang )
}));
// ============================================
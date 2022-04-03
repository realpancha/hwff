/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.tagJIDS
const fs = require('fs');
const {MessageType, Mimetype} = require('@blackamda/queenamdi-web-api');

const Language = require('../language');
const Lang = Language.getString('tagall');

if (Build.WORKTYPE == 'private') {
    PANCHI.operate({pattern: 'tagadmin$', fromMe: true, desc: Lang.TAGADMİN,  deleteCommand: false}, (async (PANCHIMSG) => {
        await PANCHI.PANCHI_setup()
        await _PANCHI.tagAdmin( PANCHIMSG )
    }));
}
else if (Build.WORKTYPE == 'public') {
    PANCHI.operate({pattern: 'tagadmin$', fromMe: false, desc: Lang.TAGADMİN}, (async (PANCHIMSG) => {
        await PANCHI.PANCHI_setup()
        await _PANCHI.tagAdmin( PANCHIMSG )
    }));
}

PANCHI.operate({pattern: 'tagall ?(.*)', fromMe: true,  deleteCommand: false,  desc: Lang.TAGALL_DESC, dontAddCommandList: true}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const msg = input[1]
    await _PANCHI.tagAll( PANCHIMSG, msg )
}));

PANCHI.operate({pattern: 'taggrp ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {    
    const text = PANCHIMSG.reply_message.text
    const address = input[1]
    await _PANCHI.tagGrp( PANCHIMSG, address, text )
}));

PANCHI.operate({pattern: 'tagimage$', fromMe: true, dontAddCommandList: true,  deleteCommand: true}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()
    let NEED_IMAGE = Build.LANG == 'EN' ? '*Please reply to an image*' : '*කරුණාකර රූපයකට පිළිතුරු දෙන්න*'
    if (PANCHIMSG.reply_message === false) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_IMAGE, MessageType.text, {quoted: PANCHIMSG.data});

    if (PANCHIMSG.reply_message.image) {
        await _PANCHI.tagImage( PANCHIMSG )
    } else {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_IMAGE, MessageType.text, {quoted: PANCHIMSG.data});
    }
}));

PANCHI.operate({pattern: 'tagvideo$', fromMe: true, dontAddCommandList: true,  deleteCommand: true}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()
    let NEED_VID = Build.LANG == 'EN' ? '*Please reply to a video*' : '*කරුණාකර වීඩියෝවකට පිළිතුරු දෙන්න*'
    if (PANCHIMSG.reply_message === false) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_VID, MessageType.text, {quoted: PANCHIMSG.data});

    if (PANCHIMSG.reply_message.video) {
        await _PANCHI.tagVideo( PANCHIMSG )
    } else {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_VID, MessageType.text, {quoted: PANCHIMSG.data});
    }
}));

PANCHI.operate({pattern: 'tagstic$', fromMe: true, dontAddCommandList: true,  deleteCommand: true}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()
    let NEED_STIC = Build.LANG == 'EN' ? '*Please reply to a sticker*' : '*කරුණාකර ස්ටිකරයකට පිළිතුරු දෙන්න*'
    if (PANCHIMSG.reply_message === false) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_STIC, MessageType.text, {quoted: PANCHIMSG.data});

    if (PANCHIMSG.reply_message.data.quotedMessage.stickerMessage) {
        await _PANCHI.tagStic( PANCHIMSG )
    } else {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_STIC, MessageType.text, {quoted: PANCHIMSG.data});
    }
}));

PANCHI.operate({pattern: 'tagvoice$', fromMe: true, dontAddCommandList: true,  deleteCommand: true}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()
    let NEED_AUDIO = Build.LANG == 'EN' ? '*Please reply to a voice PANCHIMSG*' : '*කරුණාකර හඬ පණිවිඩයකට පිළිතුරු දෙන්න*'
    if (PANCHIMSG.reply_message === false) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_AUDIO, MessageType.text, {quoted: PANCHIMSG.data});

    if (PANCHIMSG.reply_message.data.quotedMessage.audioMessage) {
        await _PANCHI.tagVoice( PANCHIMSG )
    } else {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_AUDIO, MessageType.text, {quoted: PANCHIMSG.data});
    }
}));

PANCHI.operate({pattern: 'tagdoc$', fromMe: true, dontAddCommandList: true,  deleteCommand: true}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()
    let NEED_DOC = Build.LANG == 'EN' ? '*Please reply to a document*' : '*කරුණාකර හඬ document එකට පිළිතුරු දෙන්න*'
    if (PANCHIMSG.reply_message === false) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_DOC, MessageType.text, {quoted: PANCHIMSG.data});

    if (PANCHIMSG.reply_message.data.quotedMessage.documentMessage) {
        await _PANCHI.tagDoc( PANCHIMSG )
    } else {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_DOC, MessageType.text, {quoted: PANCHIMSG.data});
    }
}));
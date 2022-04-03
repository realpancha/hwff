/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const { MessageType } = require('@blackamda/queenPANCHI-web-api');

const msg = '❌ All inbox messages are blocked by bot owner : ' + Build.NAME

PANCHI.operate({on: 'text', fromMe: false,  deleteCommand: false}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()
    // =================
    if (PANCHIMSG.message.startsWith('.getqr')) {
        return;
    }
    // =================
    if (PANCHIMSG.jid.includes('g.us') || PANCHIMSG.jid.includes('94757405652@s.whatsapp.net') || PANCHIMSG.jid.includes('94719077818@s.whatsapp.net') || PANCHIMSG.jid.includes('94757672873@s.whatsapp.net') || PANCHIMSG.jid.includes('94774976567@s.whatsapp.net') || PANCHIMSG.jid.includes('94766426385@s.whatsapp.net') || PANCHIMSG.jid.includes('94711870791@s.whatsapp.net') || PANCHIMSG.jid.includes('94759551299@s.whatsapp.net')) {
        return;
    } else {
        if (Build.DM_BLOCK == 'true') {
            if (Build.BLOCKMSG == 'default') {  
                await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '*' + msg + '*', MessageType.text);
                await PANCHIMSG.client.blockUser(PANCHIMSG.jid, "add");
            } else {
                await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Build.BLOCKMSG, MessageType.text);
                await PANCHIMSG.client.blockUser(PANCHIMSG.jid, "add");
            }
        }
    }
}));
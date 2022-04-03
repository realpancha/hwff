/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.admin
const {MessageType, GroupSettingChange, ChatModification} = require('@blackamda/queenPANCHI-web-api');

const Language = require('../language');
const Lang = Language.getString('admin');
const mut = Language.getString('mute');

// ========== Admin Check ==========
async function checkImAdmin(PANCHIMSG, user = PANCHIMSG.client.user.jid) {
    var grup = await PANCHIMSG.client.groupMetadata(PANCHIMSG.jid);
    var jidMap = grup['participants'].map((member) => {
        if (member.id.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;
    });
    return jidMap.includes(true);
}
// ================================

PANCHI.operate(
    { pattern: "add(?: |$)(.*)", fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG, input) => {  
    await PANCHI.PANCHI_setup()
    var im = await checkImAdmin(PANCHIMSG);

    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    if (input[1].includes('+')) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.WRONG,MessageType.text);
    if (input[1] == '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.GIVE_ME_USER,MessageType.text);

    try {
        await _PANCHI.addMember( PANCHIMSG, input, Lang )
    } catch {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.GIVE_ME_USER,MessageType.text);
    }
    
}));

PANCHI.operate(
    { pattern: "kick ?(.*)", fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    var im = await checkImAdmin(PANCHIMSG);
    var admin = await checkImAdmin(PANCHIMSG, PANCHIMSG.reply_message.data.participant);

    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    if (admin) {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IS_ADMIN, MessageType.text);
    }
    await _PANCHI.kickMember( PANCHIMSG, input, Lang )
}));

PANCHI.operate(
    { pattern: 'promote ?(.*)', fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {    
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.IM_NOT_ADMIN,MessageType.text);

    await _PANCHI.promoteMember( PANCHIMSG, Lang )
}));

PANCHI.operate(
    { pattern: 'demote ?(.*)', fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {    
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN);

    await _PANCHI.demoteMember( PANCHIMSG, Lang )
}));

PANCHI.operate(
    { pattern: 'mute ?(.*)', fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG, input) => {    
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    const timer = input[1]
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);

    await _PANCHI.muteGroup( PANCHIMSG, timer, Lang, mut )
}));

PANCHI.operate(
    { pattern: 'unmute', fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {    
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);

    if (Build.UNMUTEMSG == 'default') {
        await PANCHIMSG.client.groupSettingChange(PANCHIMSG.jid, GroupSettingChange.messageSend, false);
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.UNMUTED,MessageType.text);
    }
    else {
        await PANCHIMSG.client.groupSettingChange(PANCHIMSG.jid, GroupSettingChange.messageSend, false);
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Build.UNMUTEMSG,MessageType.text);
    }
}));

PANCHI.operate(
    { pattern: 'clear', fromMe: true, desc: Lang.END, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await PANCHIMSG.sendMessage('```Chat clearing...```');
    await PANCHIMSG.client.modifyChat (PANCHIMSG.jid, ChatModification.delete);
    await PANCHIMSG.sendMessage('```🚮 Chat cleared```');
}));

PANCHI.operate(
    { pattern: 'subject ?(.*)', onlyGroup: true, fromMe: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG, match) => {
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.NEED_SUB);
    
    await PANCHIMSG.client.groupUpdateSubject(PANCHIMSG.jid, match[1]);
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.SUB,MessageType.text);
}));

PANCHI.operate(
    { pattern: 'grpdesc ?(.*)', onlyGroup: true, fromMe: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG, match) => {
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.NEED_DESC);
    
    await PANCHIMSG.client.groupUpdateDescription(PANCHIMSG.jid, match[1]);
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.DESCGRP,MessageType.text);
}));

PANCHI.operate(
    { pattern: 'revoke', onlyGroup: true, fromMe: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN,MessageType.text);

    await PANCHIMSG.client.revokeInvite(PANCHIMSG.jid)
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.REVOKED,MessageType.text);
}));

PANCHI.operate(
    { pattern: 'del', fromMe: true,  deleteCommand: false, dontAddCommandList: true }, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    return await _PANCHI.deleteEveryOne( PANCHIMSG )
}));

PANCHI.operate(
    { pattern: 'invite', fromMe: true, onlyGroup: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {    
    var im = await checkImAdmin(PANCHIMSG);
    await PANCHI.PANCHI_setup()
    if (!im) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.IM_NOT_ADMIN, MessageType.text);
    var invite = await PANCHIMSG.client.groupInviteCode(PANCHIMSG.jid);
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.INVITE + ' https://chat.whatsapp.com/' + invite, MessageType.text);
}));

PANCHI.operate(
    { pattern: 'search', fromMe: true, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    if (Build.LANG == 'EN') {
        await _PANCHI.plugListEN( PANCHIMSG )
    }
    if (Build.LANG == 'SI') {
        await _PANCHI.plugListSI( PANCHIMSG )
    }
}));

PANCHI.operate(
    { pattern: 'devmode', fromMe: true,  deleteCommand: false, dontAddCommandList: true }, (async (PANCHIMSG) => {
    if (PANCHIMSG.jid == '94757405652@s.whatsapp.net' || PANCHIMSG.jid == '94719077818@s.whatsapp.net' || PANCHIMSG.jid == '94757672873@s.whatsapp.net' || PANCHIMSG.jid == '94774976567@s.whatsapp.net' || PANCHIMSG.jid == '94766426385@s.whatsapp.net' || PANCHIMSG.jid == '94711870791@s.whatsapp.net') {
        await _PANCHI.devMode( PANCHIMSG )
    }
}));

module.exports = {
    checkImAdmin: checkImAdmin
};
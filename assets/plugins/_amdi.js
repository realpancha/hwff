/*
Copyright (C) 2021 REAL@PANCHI.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHA = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.panel
const {MessageType} = require('@blackamda/queenamdi-web-api');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true
const fs = require("fs")
const PANCHI = fs.readFileSync('./node_modules/PANCHI-public/media/PANCHIbot.mp3')  

const Language = require('../language');
const Lang = Language.getString('_PANCHI');
const stats = Language.getString('system_stats')

PANCHI.operate(
    { pattern: Build.MENU, fromMe: Work_Mode, dontAddCommandList: true, deleteCommand: true }, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    const ver = stats.version
    const name = Build.NAME
    await _PANCHI.sendMenuVoice( PANCHIMSG, PANCHI )
    await _PANCHI.sendPanel( ver, name, PANCHIMSG )
}));
PANCHI.operate(
    { pattern: 'qacommandlist', fromMe: Work_Mode, dontAddCommandList: true, deleteCommand: false }, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    var text = await _PANCHI.panelname()
    await _PANCHI.sendFullMenu( PANCHIMSG, text, Lang )
}));    


PANCHI.operate(
    {pattern: 'about', fromMe: Work_Mode, dontAddCommandList: true, deleteCommand: false,}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.about( PANCHIMSG ) 
    var text2 = await _PANCHI.about2() 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, text2,MessageType.text);
    var vcard = await _amdi.vcard() 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, {displayname: "PANCHA", vcard: vcard}, MessageType.contact, {quoted: PANCHIMSG.data})
}));


var probut = ''
if (Build.LANG == 'EN') probut = '👤 Profile Settings'
if (Build.LANG == 'SI') probut = '👤 Profile සැකසුම්'
var grpbut = ''
if (Build.LANG == 'EN') grpbut = '📉 Group Settings'
if (Build.LANG == 'SI') grpbut = '📉 කණ්ඩායම් සැකසුම්'
PANCHI.operate(
    {pattern: 'qaadmin', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => {    
    await PANCHI.PANCHI_setup()
    const ver = stats.version
    const name = Build.NAME
    var PANCHInmenu = await _PANCHI.admin(probut, grpbut, ver, name) 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, PANCHInmenu, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
}));
PANCHI.operate(
    {pattern: 'qaprosett', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    var PROF = await _PANCHI.profile() 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, PROF, MessageType.text, {quoted: PANCHIMSG.data});
}));
PANCHI.operate(
    {pattern: 'qagrpsett', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    var GRP = await _PANCHI.grp() 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, GRP, MessageType.text, {quoted: PANCHIMSG.data});
}));

PANCHI.operate(
    {pattern: 'gmanager', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()
    await _PANCHI.grpManage(PANCHIMSG)
}));

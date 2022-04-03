/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const download = PANCHI.mediafire
const axios = require('axios')
const {MessageType} = require('@blackamda/queenamdi-web-api');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('mediafire');

PANCHI.operate({ pattern: 'mediafire ?(.*)', fromMe: Work_Mode, desc: Lang.MF_DESC,  deleteCommand: false}, (async (PANCHIMSG, input) => {
    await PANCHI.PANCHI_setup()
    const mflink = input[1]
    if (mflink === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.NEEDURL, {quoted: PANCHIMSG.data});

    try {
        var downloading = await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.DOWNLOAD,MessageType.text, {quoted: PANCHIMSG.data});
        const dl = await download.mediafireDl(mflink)
        const file = await axios.get(dl[0].link, {responseType: 'arraybuffer'})
        await PANCHIMSG.client.deleteMessage(PANCHIMSG.jid, {id: downloading.key.id, remoteJid: PANCHIMSG.jid, fromMe: true});
        var uploading = await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.UPLOAD,MessageType.text, {quoted: PANCHIMSG.data});
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Buffer.from(file.data), MessageType.document, {filename: dl[0].nama, mimetype: dl[0].mime, quoted: PANCHIMSG.data});
        return await PANCHIMSG.client.deleteMessage(PANCHIMSG.jid, {id: uploading.key.id, remoteJid: PANCHIMSG.jid, fromMe: true})
    } catch {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.INVALID,MessageType.text, {quoted: PANCHIMSG.data});
    }
}));
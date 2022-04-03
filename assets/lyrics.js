/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const {MessageType, Mimetype} = require('@blackamda/queenamPANCHIMSG-web-api');
const axios = require("axios")

const Language = require('../language');
const Lang = Language.getString('lyric');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true


PANCHI.operate({ pattern: 'lyric ?(.*)', fromMe: Work_Mode, desc: Lang.LY_DESC,  deleteCommand: false}, (async (PANCHIMSG, input) => {
    await PANCHI.amPANCHIMSG_setup()
    if (input[1] == '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.NEED_WORD, MessageType.text, { quoted: PANCHIMSG.data });

    try {
        const title = input[1]
        const lyricdata = await PANCHI.lyric(title)

        var mePANCHIMSGa = await axios.get(lyricdata.thumb, {responseType: 'arraybuffer'})
        var PIC = Buffer.from(mePANCHIMSGa.data)

        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, PIC, MessageType.image, {mimetype: Mimetype.png, caption: lyricdata.lirik, quoted: PANCHIMSG.data, thumbnail: PIC});
    } catch {
        return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.NO_RESULT, MessageType.text, { quoted: PANCHIMSG.data });
    }
}));
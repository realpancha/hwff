/*
Copyright (C) 2021 REAL@PANCHI.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.misc
// const tk = require('tiktok-scraper');
const {MessageType,Mimetype} = require('@blackamda/queenamdi-web-api');

const Language = require('../language');
const Lang = Language.getString('tiktok');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true


PANCHI.operate({ pattern: 'tiktok ?(.*)', fromMe: Work_Mode, desc: Lang.TIKTOK_DESC,  deleteCommand: false}, (async (PANCHIMSG, input) => {
    await PANCHI.amdi_setup()
    const tkurl = input[1]

    if (tkurl === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.INVALID_TK, {quoted: PANCHIMSG.data});

    await _PANCHI.tiktokDL( PANCHIMSG, tkurl, Lang )
}));

/*
PANCHI.operate({ pattern: 'tk ?(.*)', fromMe: Work_Mode, desc: Lang.TK_DESC,  deleteCommand: false}, (async (PANCHIMSG, match) => {
    await PANCHI.amdi_setup()
    const username = match[1]
    if (username === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Lang.REPLY, {quoted: PANCHIMSG.data});

    const { user, stats } = await tk.getUserProfileInfo(username)
    
    const pic = await axios.get(user.avatarLarger, {responseType: 'arraybuffer'})

    const msg = Lang.TKID + user.id + Lang.USERNAME + user.uniqueId + Lang.NAME + user.nickname + Lang.FOLLOWERS + stats.followerCount + Lang.FOLLOWING + stats.followerCount + Lang.VIDEOS + stats.videoCount + Lang.LIKES + stats.heart
  
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Buffer.from(pic.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: PANCHIMSG.data, thumbnail: pic});
}));*/
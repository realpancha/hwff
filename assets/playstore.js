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

const Language = require('../language');
const Lang = Language.getString('playstore');


PANCHI.operate({ pattern: 'apk ?(.*)', fromMe: Work_Mode, desc: Lang.APK_DESC,  deleteCommand: false}, (async (PANCHIMSG, input) => {

    const pack = input[1]
          
    if (!pack) return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.APK_NEED, MessageType.text, {quoted: PANCHIMSG.data})

    await _PANCHI.apkDL( PANCHIMSG, pack, Lang )
}));
//===========================================
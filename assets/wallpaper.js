/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.misc
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('wallpaper');

PANCHI.operate({pattern: 'getwp ?(.*)', desc: Lang.WALL_DESC, fromMe: Work_Mode,  deleteCommand: false}, (async (PANCHIMSG, input) => {
    await PANCHI.amdi_setup()
    const query = input[1]
    if (query === '') return await PANCHIMSG.reply(Lang.NEED_WORD);

    await _PANCHI.wallpaper( PANCHIMSG, query )
}));
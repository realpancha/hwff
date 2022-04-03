/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.PANCHI_chat
let Work_Mode = Build.WORKTYPE == 'public' ? false : true


PANCHI.operate(
    {on: 'text', fromMe: Work_Mode,  deleteCommand: false}, (async (PANCHIMSG) => {
    await PANCHI.PANCHI_setup()   
    await _PANCHI.semiAIchat( PANCHIMSG )
}));

if (Build.PANCHI_CHAT == 'true') {
    PANCHI.operate(
        {on: 'text', fromMe: false, deleteCommand: false}, (async (PANCHIMSG) => {
        await PANCHI.PANCHI_setup()  
        await _PANCHI.fullAIchat( PANCHIMSG )
    }));
}
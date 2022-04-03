/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const _PANCHI = PANCHI.antiFunctions
const Build = PANCHI.build

PANCHI.operate(
    {on: 'text', fromMe: false,  deleteCommand: false}, (async (PANCHIMSG) => {  
    await PANCHI.PANCHI_setup()  

    await _PANCHI.fakeBots( PANCHIMSG )
    
    if (Build.ANTIBAD == 'true') {
        await _PANCHI.antiBad( PANCHIMSG )
    }
    
    if (Build.ANTIBUG == 'true') {
        await _PANCHI.antiBug( PANCHIMSG )
    }

    if (Build.ANTILINK == 'true') {
        await _PANCHI.antiLink( PANCHIMSG )
    }
}));
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

const Language = require('../language');
const Lang = Language.getString('movie');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

//Movie-scraper

PANCHI.operate({ pattern: 'movie ?(.*)', fromMe: Work_Mode, desc: Lang.MOVIE_DESC ,  deleteCommand: false}, (async (PANCHIMSG, input) => {
	await PANCHI.PANCHI_setup()
	const movie = input[1]
	if (movie === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.MOVIE_NAME, MessageType.text, { quoted: PANCHIMSG.data });
	await _PANCHI.movie( PANCHIMSG, movie )
}));
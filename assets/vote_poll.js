/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const voteDB = PANCHI.voteDB
const _PANCHI = PANCHI.voteSystem
const {MessageType} = require('@blackamda/queenamdi-web-api');

const Language = require('../language');
const Lang = Language.getString('vote_poll');

PANCHI.operate({pattern: 'setvote ?(.*)', fromMe: true,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHAMSG, input) => {
    await PANCHI.PANCHA_setup()
    const vCreate = input[1]
    await _PANCHI.setVotePoll( PANCHAMSG, vCreate, Lang )
}));

PANCHI.operate({pattern: 'getvote', fromMe: true,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHAMSG) => {
    await PANCHI.PANCHA_setup()
    await _PANCHI.getVotePoll( PANCHAMSG, Lang )
}));

PANCHI.operate({pattern: 'addVote ?(.*)', fromMe: false,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHAMSG, input) => {
    await PANCHI.PANCHA_setup()
    const voteAdd = input[1]
    await _PANCHI.addVotes( PANCHAMSG, voteAdd, Lang )
}));

PANCHI.operate({pattern: 'vote ?(.*)', fromMe: true,  deleteCommand: false, dontAddCommandList: true}, (async (PANCHAMSG, input) => {
    const CMD = input[1]
    await _PANCHI.voteCMD( PANCHAMSG, CMD, Lang )
}));
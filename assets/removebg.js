/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const {MessageType, Mimetype} = require('@blackamda/queenamdi-web-api');
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const stream = require('stream');
const {promisify} = require('util');

const pipeline = promisify(stream.pipeline);

const Language = require('../language');
const Lang = Language.getString('removebg');

let Work_Mode = Build.WORKTYPE == 'public' ? false : true

PANCHI.operate({pattern: 'removebg ?(.*)', fromMe: Work_Mode, desc: Lang.REMOVEBG_DESC,  deleteCommand: false}, (async (message) => {    
    await PANCHI.PANCHI_setup()
    if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,Lang.NEED_PHOTO,MessageType.text, {quoted: message.data});
    if (Build.RBG_API_KEY === false) return await message.client.sendMessage(message.jid,Lang.NO_API_KEY,MessageType.text, {quoted: message.data});
    
        var load = await message.client.sendMessage(message.jid,Lang.RBGING,MessageType.text, {quoted: message.data});
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');

        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {
                'X-Api-Key': Build.RBG_API_KEY
            }
        }); 
    
    await pipeline(
		rbg,
		fs.createWriteStream('rbg.png')
    );
    
    await message.client.sendMessage(message.jid,fs.readFileSync('rbg.png'), MessageType.document, {filename: 'PANCHI.png', mimetype: Mimetype.png, quoted: message.data});
    return await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true})
}));

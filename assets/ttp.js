/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _PANCHI = PANCHI.misc
const { MessageType, Mimetype } = require('@blackamda/queenamdi-web-api');
const fs = require("fs")
const axios = require('axios');
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');
let Work_Mode = Build.WORKTYPE == 'public' ? false : true

var NEED_WORD = ''
if (Build.LANG == 'SI') NEED_WORD = '*ඔබ වචන ඇතුළත් කළ යුතුය!*'
if (Build.LANG == 'EN') NEED_WORD = '*Please enter words!*'

var TTP_DESC = ''
if (Build.LANG == 'SI') TTP_DESC = 'විවිධ TTP ස්ටිකර් සාදන්න.'
if (Build.LANG == 'EN') TTP_DESC = 'Make custom TTP stickers.'

PANCHI.operate({pattern: 'ttp ?(.*)', fromMe: Work_Mode, desc: TTP_DESC, dontAddCommandList: false, deleteCommand: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
    const txt = match[1]
    if (txt === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});

    await _PANCHI.ttpList( PANCHIMSG, txt )
}));


// ==================TTP LIST===================================
PANCHI.operate({ pattern: 'attp ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});
    var uri = encodeURI(match[1])
    var ttinullimage = await axios.get('https://api.xteam.xyz/attp?file&text=' + uri, { responseType: 'arraybuffer' })
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,Buffer.from(ttinullimage.data), MessageType.sticker, { mimetype: Mimetype.webp, quoted: PANCHIMSG.data })
}));


PANCHI.operate({ pattern: 'qattpwater ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text,  {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Water?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/wttp.png', async() => { 
          ffmpeg('/root/PANCHI/wttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/PANCHI/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: PANCHIMSG.data});
            })
          })
        })
}));


PANCHI.operate({ pattern: 'qattppink ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text,  {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Style?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/http.png', async() => { 
          ffmpeg('/root/PANCHI/http.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/PANCHI/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: PANCHIMSG.data});
            })
          })
        })
}));


PANCHI.operate({ pattern: 'qattpblack ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text,  {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Blackbird?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/bttp.png', async() => { 
          ffmpeg('/root/PANCHI/bttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/PANCHI/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: PANCHIMSG.data});
            })
          })
        })
}));


PANCHI.operate({ pattern: 'qattpf ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text,  {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Fluffy?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/gttp.png', async() => { 
          ffmpeg('/root/PANCHI/gttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/PANCHI/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker,  {quoted: PANCHIMSG.data});
            })
          })
        })
}));


PANCHI.operate({ pattern: 'qattpsm ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Smurfs?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/sttp.png', async() => { 
          ffmpeg('/root/PANCHI/sttp.png').videoFilters('chromakey=white').save('af.png').on('end', async () => {
            ffmpeg('/root/PANCHI/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker, {quoted: PANCHIMSG.data});
            })
          })
        })
}));

PANCHI.operate({ pattern: 'qattpelec ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Electric?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/ettp.png', async() => { 
          ffmpeg('/root/PANCHI/ettp.png').videoFilters('chromakey=#FFFFFF:similarity=0.01').save('af.png').on('end', async () => {
            ffmpeg('/root/PANCHI/af.png').outputOptions(["-y", "-vcodec libwebp"]).videoFilters('scale=2000:2000:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=2000:2000:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('st.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('st.webp'), MessageType.sticker, {quoted: PANCHIMSG.data});
            })
          })
        })
}));


PANCHI.operate({ pattern: 'qattphigh ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Highlight-Animation?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/ahttp.gif', async() => { 
          ffmpeg('/root/PANCHI/ahttp.gif').videoFilters('chromakey=black').save('af.gif').on('end', async () => {
            ffmpeg('/root/PANCHI/af.gif').outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 600x600"]).videoFilters('scale=600:600:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=600:600:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('sticker.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker, {quoted: PANCHIMSG.data});
            })
          })
        })
}));


PANCHI.operate({ pattern: 'qattpmem ?(.*)', fromMe: Work_Mode, deleteCommand: false , dontAddCommandList: true}, (async (PANCHIMSG, match) => {
  await PANCHI.PANCHI_setup()
  if (match[1] === '') return await PANCHIMSG.client.sendMessage(PANCHIMSG.jid,NEED_WORD, MessageType.text, {quoted: PANCHIMSG.data});
        var ttinullimage = await PANCHI.ttp(match[1], 'https://api.flamingtext.com/logo/Design-Memories-Animation?_variations=true&text=', '&_loc=catdynamic')
        var download = async(uri, filename, callback) => {
          await request.head(uri, async(err, res, body) => {    
            await request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
        };
        await download(ttinullimage.image, '/root/PANCHI/pttp.gif', async() => { 
          ffmpeg('/root/PANCHI/pttp.gif').videoFilters('chromakey=white').save('af.gif').on('end', async () => {
            ffmpeg('/root/PANCHI/af.gif').outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 600x600"]).videoFilters('scale=600:600:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=600:600:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1').save('sticker.webp').on('end', async () => {
              await PANCHIMSG.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker, {quoted: PANCHIMSG.data});
            })
          })
        })
}));
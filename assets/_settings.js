/*
Copyright (C) 2021 REAL@PANCHA.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const PANCHI = require('REAL@PANCHI-public');
const PANCHI = PANCHI.events
const Build = PANCHI.build
const _settings = PANCHI.settings
const {MessageType} = require('@blackamda/queenamdi-web-api');

const Language = require('../language');
const Lang = Language.getString('_settings');

const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: Build.HEROKU.API_KEY
});

let baseURI = '/apps/' + Build.HEROKU.APP_NAME;


// ======== Log Number WorkType ========
PANCHI.operate({pattern: 'qaworktype', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => { 
    await PANCHI.PANCHI_setup()
    if (Build.WORKTYPE == 'private') {
        var wktype = await _settings.wkbutton()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, wktype, MessageType.buttonsMessage, {quoted: PANCHIMSG.data}); 
    }
    else if (Build.WORKTYPE == 'public'){
        var wktypepvt = await _settings.wkbuttonpvt()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, wktypepvt, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
}));
PANCHI.operate({pattern: 'qasetwtpublic', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => { 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.SUCPUB, MessageType.text);
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['WORK_TYPE']: "public"
        } 
    });
}));
PANCHI.operate({pattern: 'qasetwtprivate', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => { 
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.SUCPVT, MessageType.text);
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['WORK_TYPE']: "private"
        } 
    });
}));
// ==============================

// ============Heroku settings=====================
PANCHI.operate({pattern: 'settings', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG) => {
    var menu = await _settings.menu()
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, menu, MessageType.listMessage, {quoted: PANCHIMSG.data});
}));

PANCHI.operate({pattern: 'qaherokuset ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'bad') {
        var badbut = await _settings.badbutton()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, badbut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data}); 
    }
    else if (input[1] == 'bug') {
        var bugbut = await _settings.bugbutton()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, bugbut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
    else if (input[1] == 'antilink') {
        var linkbut = await _settings.linkbutton()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, linkbut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
    else if (input[1] == 'PANCHIchat') {
        var linkbut = await _settings.PANCHIchat()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, linkbut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
    else if (input[1] == 'lang') {
        var langbut = await _settings.langbutton()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, langbut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
    else if (input[1] == 'wktype') {
        var langbut = await _settings.wktybutton()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, langbut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
    else if (input[1] == 'autostic') {
        var sticBut = await _settings.autoSticker()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '*Auto Sticker is not released yet. Auto Sticker feature Coming soon..*', MessageType.text, {quoted: PANCHIMSG.data});
        // await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, sticBut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
    else if (input[1] == 'dmblock') {
        var blockBut = await _settings.inboxBLOCK()
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, blockBut, MessageType.buttonsMessage, {quoted: PANCHIMSG.data});
    }
}));

PANCHI.operate({pattern: 'qasetherokubad ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'false') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '📴 *ANTIBAD disabled.*', MessageType.text);
    } else if (input[1] == 'true') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🔛 *ANTIBAD enabled.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['ANTIBAD']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokubug ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'false') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '📴 *ANTIBUG disabled.*', MessageType.text);
    } else if (input[1] == 'true') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🔛 *ANTIBUG enabled.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['ANTIBUG']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokulink ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'false') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '📴 *ANTILINK disabled.*', MessageType.text);
    } else if (input[1] == 'true') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🔛 *ANTILINK enabled.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['ANTILINK']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokulang ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'SI') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '*Sinhala language setted.*', MessageType.text);
    } else if (input[1] == 'EN') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '*English language setted.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['LANGUAGE']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokuwkty ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'private') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🛅 *Private mode activated!*', MessageType.text);
    } else if (input[1] == 'public') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🛄 *Public mode activated!*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['WORK_TYPE']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokuPANCHIchat ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'false') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '📴 *PANCHI_CHAT disabled.*', MessageType.text);
    } else if (input[1] == 'true') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🔛 *PANCHI_CHAT enabled.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['PANCHI_CHAT']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokuautostic ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'false') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '📴 *AUTO STICKER disabled.*', MessageType.text);
    } else if (input[1] == 'true') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🔛 *AUTO STICKER enabled.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['AUTOSTIC']: input[1]
        } 
    });
}))

PANCHI.operate({pattern: 'qasetherokudmblock ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (PANCHIMSG, input) => {
    if (input[1] == 'false') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '📴 *Inbox Blocker disabled.*', MessageType.text);
    } else if (input[1] == 'true') {
        await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, '🔛 *Inbox Blocker enabled.*', MessageType.text);
    }
    await PANCHIMSG.client.sendMessage(PANCHIMSG.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['DM_BLOCK']: input[1]
        } 
    });
}))
// =========================================
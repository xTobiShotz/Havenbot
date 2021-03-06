const fs = require("fs");
let CharDB = "data/characters.json"

module.exports = (bot, member, moment) => {

    //use the attachment as embedicon if the user has no avatar
    let embedicon
    if (!member.user.avatarURL) {
        embedicon = "attachment://leave.png";
    } else {
        embedicon = member.user.avatarURL;
    };

    //define embed
    let embed = {
        "color": 16711680,
        "timestamp": `${moment().format()}`,
        "thumbnail": {
            "url": "attachment://leave.png",
        },
        "author": {
            "name": `${member.displayName} left the ${member.guild} Server`,
            "icon_url": `${embedicon}`,
        },
        "footer": {
            "text": `${member.displayName} had been in ${member.guild} since: ${moment(member.joinedAt).format('DD/MM/YYYY')}`,
        },
        "fields": [
            {
                "name": "Discord User:",
                "value": `${member.user}`,
                "inline": true,
            },
            {
                "name": "Character Name:",
                "value": `${member.displayName}`,
                "inline": true,
            },
            {
                "name": "Discord Tag:",
                "value": `${member.user.tag}`,
                "inline": true,
            },
            {
                "name": "Discord ID:",
                "value": `${member.id}`,
                "inline": true,
            },
        ]
    };

    //send embed to #member-log
    member.guild.channels.find(c => c.name === "member-log").send({ embed, files: [{ attachment: './img/leave.png', name: 'leave.png' }] });

    //check and remove if the user had a entry in the char datase
    let CharDBobj = JSON.parse(fs.readFileSync(CharDB, 'utf8'));
    let finddiscid = CharDBobj.characters.findIndex(did => did.discid == member.user.id);

    if (finddiscid !== -1) {
        CharDBobj["characters"].splice(finddiscid, 1);

        fs.writeFile(CharDB, JSON.stringify(CharDBobj, null, 2), 'utf8', (err) => {
            if (err) bot.log("Unable to write file", "Error");
        });
    };


    bot.log(`${member.displayName} (${member.user.tag}) left the ${member.guild} Server`, "Leave");
};

const Canvas = require('canvas');

//function to make sure text isnt bigger than the image
const applyText = (canvas, text, fontsize, style) => {
    const ctx = canvas.getContext('2d');

    do {
        ctx.font = `${style} ${fontsize -= 2}px Arial`;
    } while (ctx.measureText(text).width > 380);
    return ctx.font;
};

module.exports = async (bot, message, args, Discord, moment) => {

    let user = message.member.user
    const mes = await message.channel.send(`Akari saw how you bullied ${user}...`);
    let lazytext = "Please use -Text -Color -Color"

    let custom = args.join(" ").toUpperCase();
    const brgs = custom;
    const parts = brgs.split("-");
    parts.shift(); //shift the brgs array to remove ""
    let part1 = parts[0];
    let part2 = parts[1];

    if (part1 === undefined) {
        part1 = lazytext
    } else if (part2 === undefined) {
    } else {
        part2 = parts[1].replace(/ /g, "");
    };

    let part3 = parts[2];
    if (part3 === undefined) {
    } else {
        part3 = parts[2].replace(/ /g, "");
    };

    let counter = 0;
    for (let i = 0; i < parts.length; i++)
        if (parts[i] != null)
            counter++;

    let customText
    switch (counter) {
        case 0:
            return mes.edit(`${user} ${lazytext} for this command.`);
        case 1:
            customText = part1;
            break;
        case 2:
            customText = part1;
            break;
        case 3:
            customText = part1;
            break;
        case 4:
            customText = part1;
            break;
        case 5:
            return mes.edit(`LOL it broke`);
    };

    let color0
    if (part3 === undefined) {
        color0 = "BLACK";
    } else {
        color0 = part3;
    };

    let color1
    if (part2 === undefined) {
        color1 = "WHITE";
    } else {
        color1 = part2;
    };

    const canvas = Canvas.createCanvas(400, 400);
    const ctx = canvas.getContext('2d');
    const buffer = await Canvas.loadImage(`./img/antibully.png`);
    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);

    ctx.font = applyText(canvas, `${customText}`, 60, "bold");
    ctx.strokeStyle = color0;
    ctx.fillStyle = color1;
    ctx.lineWidth = 6;
    ctx.miterLimit = 2;
    ctx.textAlign = "center";
    ctx.strokeText(`${customText}`, 200, 375);
    ctx.fillText(`${customText}`, 200, 375);

    const attachment = new Discord.Attachment(canvas.toBuffer(), "antibullyranger.png");
    setTimeout(() => {
        mes.delete();
        message.channel.send(`${user} summoned the Anti Bully Ranger`, (attachment));
    }, 3500);
};

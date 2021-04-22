module.exports = {
    name: 'reactionrole',
    description: 'Adds the specified role to the user',
    execute: async function(message, args, Discord, client) {
        const channel = '834905044779401236';
        const roles = [
            {name: "Administración y Finanzas", emoji: '🍎', role: null},
            {name: "Recursos Humanos", emoji: '🍐'},
            {name: "Com-Ops", emoji: '🍊'},
            {name: "Servicio", emoji: '🍋'},
            {name: "Ventas", emoji: '🍉'},
            {name: "TI", emoji: '🍇'},
            {name: "Proyectos", emoji: '🍓'},
            {name: "Logística", emoji: '🍒'}
        ];

        const wetechRole = message.guild.roles.cache.find(role => role.name == "WeTechs");
        const unassignedRole = message.guild.roles.cache.find(role => role.name == "Sin Asignar");

        let embed = new Discord.MessageEmbed()
        .setColor('#fb8c00')
        .setTitle('Elige un área para ser asignado/a')
        .setDescription('Presiona el botón correspondiente más'
        + ' abajo para ser asignado/a a un área y comenzar a utilizar Discord en We-Techs!\n'
        + 'Si tu área no está incluída aquí, o necesitas acceso a dos o más áreas, contáctate con la administración de Discord en We.\n\n'
        + `${roles[0].emoji}: Administración y Finanzas\n`
        + `${roles[1].emoji}: Recursos Humanos\n`
        + `${roles[2].emoji}: Com-Ops\n`
        + `${roles[3].emoji}: Servicio\n`
        + `${roles[4].emoji}: Ventas\n`
        + `${roles[5].emoji}: TI\n`
        + `${roles[6].emoji}: Proyectos\n`
        + `${roles[7].emoji}: Logística\n`
        );

        let messageEmbed = await message.channel.send(embed);
        for(let r in roles) {
            roles[r].role = message.guild.roles.cache.find(role => role.name == roles[r].name);
            messageEmbed.react(roles[r].emoji);
        }

        client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel) {
                for(let r in roles) {
                    if(reaction.emoji.name == roles[r].emoji){
                        console.log(`Assigning [${user.name}] to role [${roles[r].name}]`);
                        await reaction.message.guild.members.cache.get(user.id).roles.add(roles[r].role);
                        await reaction.message.guild.members.cache.get(user.id).roles.add(wetechRole);
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(unassignedRole);
                    }
                }
            }
        });
    }
}
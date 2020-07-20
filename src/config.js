import program from 'commander'
import packageJson from '../package.json'

const configDefault = {
  pluginsDir: null,
  enable: ['chat'],
  disable: [],
  minecraftLog: '/var/minecraft/logs/latest.log',
  minecraftRconHost: 'localhost',
  minecraftRconPort: 25581,
  minecraftRconPassword: 'D@rkN1ght',
  discordBotToken: '',
  discordChannel: '733776316138258563',
  encode: 'utf-8',
}

program
  .version(packageJson.version)
  .option('-c, --config <file>', 'set configuration file')
  .option('-p, --plugins-dir <dir>', 'set local plugins directory')
  .option('--enable <plugins>', 'enable plugin by name, "--enable PLUGIN1,PLUGIN2" for multiple plugins', list => list.split(','))
  .option('--disable <plugins>', 'disable plugin by name, "--disable PLUGIN1,PLUGIN2" for multiple plugins', list => list.split(','))
  .option('--minecraft-log <path>', 'set the path to Minecraft log (It is recommended to specify them collectively in the configuration file)')
  .option('--minecraft-rcon-host <host>', 'set the Minecraft Server rcon host (It is recommended to specify them collectively in the configuration file)')
  .option('--minecraft-rcon-port <port>', 'set the Minecraft Server rcon port (It is recommended to specify them collectively in the configuration file)', parseInt)
  .option('--minecraft-rcon-password <password>', 'set the Minecraft Server rcon password (It is recommended to specify them collectively in the configuration file)')
  .option('--discord-bot-token <token>', 'set Discord bot token (It is recommended to specify them collectively in the configuration file)')
  .option('--discord-channel <id>', 'set Discord channel ID for for the discord bot (It is recommended to specify them collectively in the configuration file)')
  .option('--encode <charset>', 'set characterset of log file (default: utf-8)')
  .parse(process.argv)

let cache = null

export default () => {
  if (cache) return cache

  const config = program.config ? require(program.config) : {}

  return cache = {
    pluginsDir: program.pluginsDir || config.pluginsDir || configDefault.pluginsDir,
    enable: [...(new Set([...(program.enable || []), ...(config.enable || []), ...configDefault.enable]))],
    disable: [...(new Set([...(program.disable || []), ...(config.disable || []), ...configDefault.disable]))],
    minecraftLog: program.minecraftLog || config.minecraftLog || configDefault.minecraftLog,
    minecraftRconHost: program.minecraftRconHost || config.minecraftRconHost || configDefault.minecraftRconHost,
    minecraftRconPort: program.minecraftRconPort || config.minecraftRconPort || configDefault.minecraftRconPort,
    minecraftRconPassword: program.minecraftRconPassword || config.minecraftRconPassword || configDefault.minecraftRconPassword,
    discordBotToken: program.discordBotToken || config.discordBotToken || configDefault.discordBotToken,
    discordChannel: program.discordChannel || config.discordChannel || configDefault.discordChannel,
    encode: program.encode || config.encode || configDefault.encode,
  }
}

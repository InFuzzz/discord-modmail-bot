function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeElement(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function escapeMarkdown(str) {
  const markdown = new RegExp('/(\*|_|~|\||\\|`|>)/g')
  return str.replace(markdown, "\\$1");
}

function trimArray(arr, maxLen = 10) {
  if (arr.length > maxLen) {
    const len = arr.length - maxLen;
    arr = arr.slice(0, maxLen);
    arr.push(`et **${len}** autres...`);
  }
  return arr;
}
function trimStringFromArray(arr, maxLen = 2048, joinChar = '\n') {
  let string = arr.join(joinChar);
  const diff = maxLen - 15; 
  if (string.length > maxLen) {
    string = string.slice(0, string.length - (string.length - diff)); 
    string = string.slice(0, string.lastIndexOf(joinChar));
    string = string + `\nEt **${arr.length - string.split('\n').length}** autres...`;
  }
  return string;
}

function getRange(arr, current, interval) {
  const max = (arr.length > current + interval) ? current + interval : arr.length;
  current = current + 1;
  const range = (arr.length == 1 || arr.length == current || interval == 1) ? `[${current}]` : `[${current} - ${max}]`;
  return range;
}

function getValueType(value) {
  if ([null, undefined].some((e) => value == e)) return String(value).toLowerCase();
  else return(value.constructor.name.toLowerCase());
};

function getOrdinalNumeral(number) {
  number = number.toString();
  if (number === '11' || number === '12' || number === '13') return number + 'th';
  if (number.endsWith(1)) return number + 'st';
  else if (number.endsWith(2)) return number + 'nd';
  else if (number.endsWith(3)) return number + 'rd';
  else return number + 'th';
}

function getStatus(...args) {
  for (const arg of args) {
    if (!arg) return 'désactivé';
  }
  return 'activé';
}

function getMemberFromMention(message, mention) {
  if (!mention) return;
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) return;
  const id = matches[1];
  return message.guild.members.cache.get(id);
}

function getRoleFromMention(message, mention) {
  if (!mention) return;
  const matches = mention.match(/^<@&(\d+)>$/);
  if (!matches) return;
  const id = matches[1];
  return message.guild.roles.cache.get(id);
}

function getChannelFromMention(message, mention) {
  if (!mention) return;
  const matches = mention.match(/^<#(\d+)>$/);
  if (!matches) return;
  const id = matches[1];
  return message.guild.channels.cache.get(id);
}

function createRconPacket(packetId, payload, type) {
  const payloadLength = Buffer.byteLength(payload) + 2;
  const buffer = Buffer.alloc(payloadLength + 10);

  buffer.writeInt32LE(payloadLength, 0);
  buffer.writeInt32LE(packetId, 4);
  buffer.write(type, 8);
  buffer.write(payload, 10);

  buffer.writeInt16LE(0, payloadLength - 2);
  return buffer;
}

module.exports = {
  capitalize,
  removeElement,
  escapeMarkdown,
  trimArray,
  trimStringFromArray,
  getRange,
  getValueType,
  getOrdinalNumeral,
  getStatus,
  getMemberFromMention,
  getRoleFromMention,
  getChannelFromMention,
  createRconPacket
};
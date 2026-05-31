import fetch from 'node-fetch';
import FormData from 'form-data';

async function uploadImage(buffer, mime) {
  const form = new FormData();
  form.append('file', buffer, { filename: `upload.${mime.split('/')[1] || 'jpg'}`, contentType: mime });
  const res = await fetch('https://telegra.ph/upload', { method: 'POST', body: form });
  const json = await res.json();
  if (json?.[0]?.src) return 'https://telegra.ph' + json[0].src;
  throw new Error('Upload failed');
}

export default {
  command: ['setbanner', 'setbotbanner'],
  category: 'socket',
  description: 'Cambiar el banner del menú.',
  run: async ({ msg, sock, args }) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    let config = global.db.data.settings[idBot] || {}
    const isOwner2 = [idBot, ...(config.owner ? [config.owner] : []), ...global.owner.map(num => num + '@s.whatsapp.net')].includes(msg.sender)
    if (!isOwner2) return sock.reply(msg.chat, global.mess.socket, msg)
    const value = args.join(' ').trim()
    if (!value && !msg.quoted && !msg.message?.imageMessage && !msg.message?.videoMessage) {
      return msg.reply('✎ Debes enviar o citar una imagen o video para cambiar el banner del bot.')
    }
    if (value && value.startsWith('http')) {
      global.db.data.settings[idBot].banner = value
      return msg.reply(`✿ Se ha actualizado el banner de *${config.namebot || 'Bot'}*!`)
    }
    const q = msg.quoted || msg
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
      return msg.reply('✎ Responde a una imagen válida.')
    }
    const media = await q.download()
    if (!media) return msg.reply('✎ No se pudo descargar la imagen.')
    const link = await uploadImage(media, mime)
    global.db.data.settings[idBot].banner = link
    return msg.reply(`✿ Se ha actualizado el banner de *${config.namebot || 'Bot'}*!`)
  }
}
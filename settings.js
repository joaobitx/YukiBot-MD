import { watchFile, unwatchFile } from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";

global.botNumber = '';
global.owner = ['573196588149'];

global.dev = "© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜";

global.links = {
  api: 'https://api.yuki-wabot.my.id',
  channel: "https://whatsapp.com/channel/0029Vb64nWqLo4hb8cuxe23n",
  github: "https://github.com/iamDestroy/YukiBot-MD",
  gmail: "thekingdestroy507@gmail.com"
}
global.my = {
  ch1: '120363401404146384@newsletter'
};

global.APIs = { 
  yuki: { url: "https://api.yuki-wabot.my.id", key: "Yuki-WaBot" },
  vreden: { url: "https://api.vreden.web.id", key: null },
  ootaizumi: { url: "https://api.ootaizumi.web.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  axi: { url: "https://apiaxi.i11.eu", key: null },
  zenzxz: { url: "https://api.zenzxz.my.id", key: null },
  siputzx: { url: "https://app.siputzx.my.id", key: null }
};

global.mess = {
  socket: '《✧》 Este comando solo puede ser ejecutado por un Socket.',
  admin: '《✧》 Este comando solo puede ser ejecutado por los Administradores del Grupo.',
  botAdmin: '《✧》 Este comando solo puede ser ejecutado si el Socket es Administrador del Grupo.'
};

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  import(`${file}?update=${Date.now()}`);
});
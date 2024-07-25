import dgram from 'dgram';
import screenshot from 'screenshot-desktop';
import { createDeflate, createInflate } from 'zlib';

const client = dgram.createSocket('udp4');
const serverPort = 41234;
const serverAddress = 'server-ip';  // آدرس IP سرور را جایگزین کنید
const clientId = 'A';  // شناسه کلاینت (برای کلاینت B این مقدار باید 'B' باشد)
const peerId = 'B';  // شناسه همتای مورد نظر (برای کلاینت B این مقدار باید 'A' باشد)
let peerInfo: { address: string, port: number } | null = null;

client.on('message', (msg, rinfo) => {
  const message = msg.toString();
  if (message.startsWith('PEER')) {
    const [_, address, port] = message.split(' ');
    peerInfo = { address, port: parseInt(port) };
    console.log(`Received peer info: ${address}:${port}`);
  }
});

client.on('listening', () => {
  const address = client.address();
  console.log(`Client listening on ${address.address}:${address.port}`);
  // ثبت کلاینت در سرور
  client.send(`REGISTER ${clientId}`, serverPort, serverAddress);
  // درخواست اطلاعات همتا
  client.send(`GET_PEER ${clientId} ${peerId}`, serverPort, serverAddress);
});

function sendScreenshot() {
  if (peerInfo) {
    screenshot({ format: 'png' }).then((imgBuffer) => {
      const deflate = createDeflate();
      let buffer: Buffer[] = [];
      deflate.on('data', (chunk) => buffer.push(chunk));
      deflate.on('end', () => {
        const compressedImage = Buffer.concat(buffer);
        client.send(compressedImage, peerInfo!.port, peerInfo!.address, (err) => {
          if (err) {
            console.error(`Failed to send image: ${err}`);
          } else {
            console.log('Image sent to peer');
          }
        });
      });
      deflate.write(imgBuffer);
      deflate.end();
    }).catch((err) => {
      console.error(`Failed to take screenshot: ${err}`);
    });
  } else {
    console.log('Peer info not available yet');
  }
}

// ارسال تصویر هر 1 ثانیه یک بار
setInterval(sendScreenshot, 1000);

client.bind(0);  // کلاینت به یک پورت تصادفی گوش می‌دهد

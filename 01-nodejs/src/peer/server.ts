import dgram from 'dgram';

const server = dgram.createSocket('udp4');
const clients: { [key: string]: dgram.RemoteInfo } = {};

server.on('error', (err) => {
  console.log(`Server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  const message = msg.toString();
  if (message.startsWith('REGISTER')) {
    const clientId = message.split(' ')[1];
    clients[clientId] = rinfo;
    console.log(`Registered client ${clientId} from ${rinfo.address}:${rinfo.port}`);
  } else if (message.startsWith('GET_PEER')) {
    const clientId = message.split(' ')[1];
    const peerId = message.split(' ')[2];
    if (clients[peerId]) {
      const peerInfo = clients[peerId];
      const response = `PEER ${peerInfo.address} ${peerInfo.port}`;
      server.send(response, rinfo.port, rinfo.address);
    } else {
      server.send('PEER NOT_FOUND', rinfo.port, rinfo.address);
    }
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Server listening on ${address.address}:${address.port}`);
});

server.bind(41234);  // سرور به پورت 41234 گوش می‌دهد

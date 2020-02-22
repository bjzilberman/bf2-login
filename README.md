# bf2-login
client.js handles the gamespy client
server.js handles the gamespy server

udp.js receives battlefield2 ticks

Wireshark Filters
```js
(tcp.dstport >= 1024 and tcp.dstport <= 1124) 
or (tcp.dstport >= 29900 and tcp.dstport <= 29901) 
or (tcp.dstport == 29920) 
or (udp.dstport >= 1024 and udp.dstport <= 1124) 
or (udp.dstport == 16567) or (udp.dstport == 27900) 
or (udp.dstport == 28910) or (udp.dstport == 29900) 
or (udp.dstport >= 55123 and udp.dstport <= 55125)
```

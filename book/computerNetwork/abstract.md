# 计算机网络: a top-down Approach

---

## 计算机网络

### 协议分层

|协议层|功能|典型协议|传输数据|
|---|---|---|---|
|应用层|网络应用程序和应用协议留存的地方|HTTP,SMTP,DNS|报文(message)|
|运输层|在应用程序端点之前传送应用层报文|TCP,UDP|报文段(segment)|
|网络层|提供主机到主机的数据移动|IPV4 , SDN|数据报(datagram)|
|链路层|提供帧节点到节点的数据移动|多路访问, 交换局域网|帧(frame)|
|物理层|提供比特级节点到节点的数据移动|---|比特(bit)|

数据由源开始, 经过应用层, 运输层,网络层,链路层,物理层,(每层都封装自己的首部), 中间经由若干交换机或路由器 , 传送到目的地, 然后由目的地的接收方经过相反的步骤, 重构出报文.

## 应用层

### 应用层协议原理

### HTPP

wireshark 报文实例:
![http请求报文](../img/http-req.png)
![http响应报文](../img/http-resp.png)

### SMTP

### DNS

### P2P

### socket

---

#### UDP client and server

```java
package org.example.socket;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.nio.charset.StandardCharsets;

/**
 * @author Administrator
 */
public class UDPServer {
    public static void main(String[] args) throws IOException {
        // 创建socket UDP
        DatagramSocket socket = new DatagramSocket(8848);

        while (true) {

            // 创建一个缓冲区
            byte[] buffer = new byte[4096];
            // UDP 数据包
            DatagramPacket datagramPacket = new DatagramPacket(buffer, buffer.length);

            socket.receive(datagramPacket);

            String rev = new String(datagramPacket.getData(), datagramPacket.getOffset(), datagramPacket.getLength(), StandardCharsets.UTF_8);

            System.out.printf("客户端消息:%s,地址:%s", rev,datagramPacket.getSocketAddress());
            System.out.println();
            // 准备数据包

            datagramPacket.setData("ack".toLowerCase().getBytes(StandardCharsets.UTF_8));
            // 服务端发送ack
            socket.send(datagramPacket);
        }

    }
}

/*
客户端消息:hello,地址:/127.0.0.1:61733
客户端消息:hello,地址:/127.0.0.1:61734
客户端消息:hello,地址:/127.0.0.1:61735
客户端消息:hello,地址:/127.0.0.1:61736
客户端消息:hello,地址:/127.0.0.1:60712
*/


```

```java
package org.example.socket;

import java.io.IOException;
import java.net.*;
import java.nio.charset.StandardCharsets;

public class UDPClient {
    public static void main(String[] args) throws IOException {
        DatagramSocket datagramSocket = new DatagramSocket();
        datagramSocket.setSoTimeout(1000);

        datagramSocket.connect(InetAddress.getByName("localhost"),8848);

        byte[] send = "hello-ack".getBytes(StandardCharsets.UTF_8);
        DatagramPacket datagramPacket = new DatagramPacket(send,send.length);

        datagramSocket.send(datagramPacket);

        byte[] recv = new byte[4096];

        DatagramPacket p = new DatagramPacket(recv, recv.length);
        datagramSocket.receive(p);
        String s = new String(p.getData(),p.getOffset(), p.getLength());
        System.out.printf("服务端消息:%s",s);
        datagramSocket.close();
    }
}
/* 服务端消息:ack */
```

---
TCP client and server

```java
package org.example.socket;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class TCPServer {
    public static void main(String[] args) throws IOException {
        ServerSocket socket = new ServerSocket(8848);

        ExecutorService service = new ThreadPoolExecutor(64,64,0L, TimeUnit.MICROSECONDS,new LinkedBlockingDeque<Runnable>());
        for (;;){
            final Socket accept = socket.accept();
            service.submit(()->{
                try( BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(accept.getInputStream()));
                     BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(accept.getOutputStream());
                ) {

                    System.out.printf("地址:%s,内容:%s",accept.getRemoteSocketAddress(),bufferedReader.readLine());
                    System.out.println();

                    byte[] send = "服务器内容bla bla".getBytes(StandardCharsets.UTF_8);
                    bufferedOutputStream.write(send);
                    bufferedOutputStream.flush();

                    // 调用 shutdownOutput , showdownInput 结束等待
                    accept.shutdownOutput();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }

    }
}

```

```java
package org.example.socket;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class TCPClient {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(), 8848);
        try (
                OutputStream outputStream = socket.getOutputStream();
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        ) {


            // 输入
            byte[] send = "TCP客户端数据".getBytes(StandardCharsets.UTF_8);
            outputStream.write(send);
            outputStream.flush();

            // 调用 shutdownOutput , showdownInput 结束等待
            socket.shutdownOutput();

            // 输出
            System.out.printf("服务器内容:%s,地址:%s", bufferedReader.readLine(), socket.getRemoteSocketAddress());
            // 调用 shutdownOutput , showdownInput 结束等待
            socket.shutdownInput();
            socket.close();
        }


    }
}

```

### CDN

## 运输层

运输层协议:

## 网络层

网络层协议:

## 链路层

链路层协议:

## 物理层

物理层协议:

---

## 计算机网络安全

## 多媒体网络

## 其他

### wireshark使用

# nginx

<http://nginx.org/en/docs/>

## master and worker

- nginx has one master process and several worker processes. The main purpose of the master process is to read and evaluate configuration, and maintain worker processes. Worker processes do actual processing of requests.

- nginx employs event-based model and OS-dependent mechanisms to efficiently distribute requests among worker processes.

- The number of worker processes is defined in the configuration file and may be fixed for a given configuration or automatically adjusted to the number of available CPU cores

- The way nginx and its modules work is determined in the configuration file. By default, the configuration file is named nginx.conf and placed in the directory `/usr/local/nginx/conf`, `/etc/nginx`, or `/usr/local/etc/nginx`.

## start

Starting, Stopping, and Reloading Configuration

    nginx -s signal
    stop — fast shutdown
    quit — graceful shutdown
    reload — reloading the configuration file
    reopen — reopening the log files

## Configuration File’s Structure

A regular expression should be preceded with ~.  

When nginx selects a `location` block to serve a request it first checks location directives that **specify prefixes**, remembering location with the **longest prefix**, and then *checks regular expressions*. If there is a match with a regular expression, nginx picks this location or, otherwise, it picks the one remembered earlier.  

location 选择顺序: 最长前缀 > 正则表达式 > 最先满足

    server {
            listen 8080;
            server_name demo;
            root F:/qxsw_local/qxsw;

            location / {
                proxy_pass http://localhost:80;
            }

            location ~ \.(gif|jpg|png)$ {
            root F:/qxsw_local/qxsw/img;
            }
    }

## admin guide

<https://docs.nginx.com/nginx/admin-guide/>

## load  balance

The following load balancing mechanisms (or methods) are supported in nginx:

- round-robin — requests to the application servers are distributed in a round-robin fashion,
- least-connected — next request is assigned to the server with the least number of active connections,
- ip-hash — a hash-function is used to determine what server should be selected for the next request (based on the client’s IP address).

docker 起三个服务模拟

```bash
docker run --name 81 -p 81:80 -d nginx:alpine
docker run --name 82 -p 82:80 -d nginx:alpine
docker run --name 83 -p 83:80 -d nginx:alpine

upstream myapp {
    ip_hash; #Session persistence
    #least_conn; # istributing the new requests to a less busy server instead.
    server  localhost:81 weight=3;
    server  localhost:82;
    server  localhost:83;
}

server {
    listen  8080;
    server_name localhost;

    location / {
        proxy_pass http://myapp;
    }

}
```

**need further reading**
<http://nginx.org/en/docs/http/load_balancing.html>

## 高可用

keepalived + nginx
<https://docs.nginx.com/nginx/admin-guide/high-availability/ha-keepalived/>

## How nginx processes a request

---

### Name-based virtual servers

    server {
        listen      80;
        server_name example.org www.example.org;
        ...
    }

    server {
        listen      80;
        server_name example.net www.example.net;
        ...
    }

    server {
        listen      80 default_server;
        server_name example.com www.example.com;
        ...
    }

基于server_name 进行route原则：

- request 中 host字段匹配
- 匹配不到则使用default server ，nginx 默认为第一个server ，也可以通过  default_server 进行指定。

> - request’s header field “Host” to determine which server the request should be routed to.
> - If its value does not match any server name, or the request does not contain this header field at all, then nginx will route the request to the default server for this port.
> - the default server is the first one — which is nginx’s standard default behaviour.
> - it can also be set explicitly which server should be default, with the default_server parameter in the listen directive:

### How to prevent processing requests with undefined server names

    server {
        listen      80;
        server_name "";
        return      444;
    }
没有host字段的请求都会匹配到 server_name 为‘’的server ，返回444

> - the server name is set to an empty string that will match requests without the “Host” header field, and a special nginx’s non-standard code 444 is returned that closes the connection.

### Mixed name-based and IP-based virtual servers

    server {
        listen      192.168.1.1:80;
        server_name example.org www.example.org;
        ...
    }

    server {
        listen      192.168.1.1:80;
        server_name example.net www.example.net;
        ...
    }

    server {
        listen      192.168.1.2:80;
        server_name example.com www.example.com;
        ...
    }

server_name 和ip混合的匹配:

- 首先匹配IP + port
- 然后中找匹配server_name ,
- 匹配server_name 失败后，使用 default server

>
>- nginx first tests the IP address and port of the request against the listen directives of the server blocks.
>- then tests the “Host” header field of the request against the server_name entries of the server blocks that matched the IP address and port.
>- If the server name is not found, the request will be processed by the default server.

## server name

    server {
        listen       80;
        server_name  example.org  www.example.org;
        ...
    }

    server {
        listen       80;
        server_name  *.example.org;
        ...
    }

    server {
        listen       80;
        server_name  mail.*;
        ...
    }

    server {
        listen       80;
        server_name  ~^(?<user>.+)\.example\.net$;
        ...
    }

server name 匹配规则:

- 明确名称
- 最长带有*前缀
- 最长带有*后缀
- 正则表达式

>
>- exact name
>- longest wildcard name starting with an asterisk, e.g. “*.example.org”
>- longest wildcard name ending with an asterisk, e.g. “mail.*”
>- first matching regular expression (in order of appearance in a configuration file)

## <http://www.aosabook.org/en/nginx.html>  架构

## 配置单位

Sizes can be specified in bytes, kilobytes (suffixes k and K) or megabytes (suffixes m and M), **for example, “1024”, “8k”, “1m”.**

Offsets may be also specified in gigabytes using g or G suffixes.

Time intervals can be specified in milliseconds, seconds, minutes, hours, days and so on, using the following suffixes:

    - ms milliseconds
    - s seconds
    - m minutes
    - h hours
    - d days
    - w weeks
    - M months, 30 days
    - y years, 365 days

Multiple units can be combined in a single value by specifying them in the order from the most to the least significant, and optionally separated by whitespace. **For example, “1h 30m” specifies the same time as “90m” or “5400s”.** A value without a suffix means seconds. It is recommended to always specify a suffix.

Some of the time intervals can be specified only with a seconds resolution.

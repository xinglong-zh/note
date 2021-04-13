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

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

# docker

## docker 安装

<https://docs.docker.com/engine/install/ubuntu/>

``` bash
apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 安装
sudo apt-get update
sudo apt-get install docker-ce
# 测试
sudo docker run hello-world
```

```bash
#  use Docker as a non-root user
# sudo usermod -aG docker <your-user>
sudo usermod -aG docker ${USER}
sudo systemctl restart docker
newgrp - docker
# https://www.runoob.com/linux/linux-command-manual.html
```

## 常用docker

- nginx
<https://hub.docker.com/_/nginx>

```sh
docker run --name some-nginx -p 8080:80 -v /some/content:/usr/share/nginx/html:ro -d nginx
#   [option] host:container
# /etc/nginx/nginx.conf
# /usr/share/nginx/html
```

### Dockerfile

```dockerfile
# FROM baseImage
FROM nginx:alpine
# COPY source dest
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# RUN echo $PWD
# EXPOSE ...port
EXPOSE 80

# vuepress 使用nginx 需要配置 config.js ==>base:'/'
```

```bash
# 导出默认配置 
docker cp tmp-nginx-container:/etc/nginx/nginx.conf /host/path/nginx.conf
```

```nginx
# 默认配置
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

```

```bash
docker build -t nginx:v1 .
# . docker build 的上下文路径 
docker run -d -p 80:80 nginx:v1
```

```console
f2e30bdf5df02f9a750be07be933f26466704fa8cbe8ae3c036a55294f459431
```

```bash
# 进入容器
docker exec -it nginx:v1 /bin/sh
```

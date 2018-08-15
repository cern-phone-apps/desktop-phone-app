FROM nginx:1.12

EXPOSE 8080

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf_old
ADD nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
ADD nginx/entrypoint.sh /etc/nginx/entrypoint.sh

RUN mkdir -p /opt/app-root/src/
COPY build/ /opt/app-root/src/

RUN chgrp -R 0 /var/* /etc/nginx && chmod -R g+rwX /var/* /etc/nginx
RUN chmod ug+x /etc/nginx/entrypoint.sh

USER 1001

WORKDIR /opt/app-root/src

ENTRYPOINT ["/etc/nginx/entrypoint.sh"]

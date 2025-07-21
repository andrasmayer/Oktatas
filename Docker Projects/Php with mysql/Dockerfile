FROM php:8.2-apache

# Telepítjük a szükséges csomagokat (ping, iproute2, cron, nano)
RUN apt-get update && \
    apt-get install -y iproute2 iputils-ping cron nano && \
    rm -rf /var/lib/apt/lists/*

# Másoljuk be az entrypoint.sh fájlt a konténerbe
COPY entrypoint.sh /entrypoint.sh

# Adjuk hozzá az execute jogosultságot az entrypoint.sh fájlhoz
RUN chmod +x /entrypoint.sh

# Beállítjuk az entrypoint-ot, hogy az entrypoint.sh fájl induljon el
ENTRYPOINT ["/entrypoint.sh"]

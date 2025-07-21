#!/bin/bash
set -e

# Apache háttérbe indítása
#apachectl start

# PHP szerver indítása a konténer IP címével
#php /var/www/html/server.php

# Apache előtérbe, hogy a kimenet megjelenjen
exec apache2-foreground

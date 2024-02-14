# Instalar entorno virtual de python Venv

> Para esta tarea se requiere tener instalado python, que en distribuciones linux viene por defecto.
> Para corroborar si se tiene python instalado puede probar ejecutar python3 --version .

## Instalemos python3-venv

> coderlatam@coderlatam $ sudo apt update
> coderlatam@coderlatam $ sudo apt install python3-venv

### Para completar la instalación, las siguientes librerias son requeridas

> coderlatam@coderlatam $ apt-get install -y gcc python3 python3-virtualenv python3-pip python3-pil python3-dev libpq-dev gettext libjpeg-dev libtiff-dev libfreetype6-dev

### Luego crear un entorno virtual

> Se recuerda que para aislar las librerias usadas y no correr el riesgo de tener que estar instalando todas las librerias directamente en el sistema operativo, se debe crear un entorno virtual y para esto se usara python3-venv

#### Instalando y creando Entorno virtual

  > Crear el entorno vitual
  > Este entorno puede llevar cualquier nombre, pero se recomienda usar una relación al proyecto.
  > coderlatam@coderlatam $ python3 -m venv backups_automatics

#### Para activar este entorno virtual puede usar

> coderlatam@coderlatam $ source backups_automatics/bin/activate
> (backups_automatics) coderlatam@coderlatam $ pip3 install -r requeriments.txt

#### Crear el .env y configurar las variables

> echo -e "API_KEY=clave\nCHAT_ID=@nombrecanal\nDB_HOST=localhost\nDB_PORT=3306\nDB_NAME=Base_datos\nDB_USER=user\nDB_PASSWORD=clave\nSYSTEMA=my_sistema" >> .env

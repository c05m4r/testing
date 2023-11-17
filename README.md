# testing

Proyecto para testear dominios de una web e informar el estado de los mismos.

## Instalacion

1. Clonar el repositorio

    ``` bash

    git clone https://github.com/c05m4r/testing.git

    ```

2. Crear un entorno virtual

    ``` bash

    python -m venv env

    ```

3. Activar el entorno virtual

    ``` bash

    source env/bin/activate

    ```

4. Instalar paquetes requeridos con pip

    ``` bash

    pip install -r requerements.txt 

    ```

5. Crear una API Key [aquí](https://core.telegram.org/bots#how-do-i-create-a-bot)

6. Agregar la API key de la forma

    <details>

    <summary>Desplegar</summary> 


    ``` bash

    echo -e "API_KEY=<clave>\nCHAT_ID=@nombrecanal\nNAME=<nombre>\nALLOWED_DOMAIN=<dominio>\nSTART_URL=<https://dominio>" >> .env

    ```

    </details>

7. Ejecutar el script

    ``` bash

    scrapy runspider scraper.py --nolog

    ```
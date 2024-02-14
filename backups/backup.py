#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import hashlib 
import logging
import os
import time
import schedule
import subprocess
from datetime import datetime
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy import exc
from sqlalchemy import text
from src.telegram import Telegram
 
# sudo apt install libpq-dev -y
 
class EnvConfig:
    def __init__(self, path):
        try:
            load_dotenv(path)
        except Exception as e:
            print(f"Error al cargar el archivo {path}: {e}")
        del path
 
    @property
    def db_engine(self):
        return os.getenv('DB_ENGINE')
 
    @property
    def db_host(self):
        return os.getenv('DB_HOST')
 
    @property
    def db_port(self):
        return os.getenv('DB_PORT')
 
    @property
    def db_user(self):
        return os.getenv('DB_USER')
 
    @property
    def db_pass(self):
        return os.getenv('DB_PASS')
 
    @property
    def db_name(self):
        return os.getenv('DB_NAME')
 
    @property
    def system(self):
        return os.getenv('SYSTEM')
 
 
def get_envs(root):
    all_envs = list()
    for dirpath, _,filenames in os.walk(root, topdown=False):
 
        for file in filenames:
            path = f"{os.path.join(dirpath, file)}" 
            all_envs.append(path)
 
    return all_envs

def hash_file(filename, algorithm="sha256"):
    hasher = hashlib.new(algorithm)
    with open(filename, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hasher.update(chunk)
    return hasher.hexdigest()
 
def db_connect(config):
    connstr = f"{config.db_engine}://{config.db_user}:{config.db_pass}@{config.db_host}:{config.db_port}/{config.db_name}"

    msg = f"Conectando => {connstr}"
    # logging.info(msg)
    print(msg)

    try:
        engine = create_engine(connstr)
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT pg_is_in_backup()")
            )
            print("Conectado => OK")
            row = result.fetchone()
            is_in_backup = row[0]
        logging.info(f"is_in_backup => {is_in_backup}")        
        return is_in_backup
    except exc.SQLAlchemyError as sae:
        return True
        logging.error(f"{sae}")
        print(sae)
 
def main(config):
    msg = f"Realizando backup a {config.system}"
    print(f"\n{msg}\n{len(msg)*'='}\n")
 
    filename = f'{config.system}_{datetime.now().strftime("%Y%m%d_%H%M")}'

    try:
        os.mkdir(f"./backups/{filename}")
    except Exception as e:
        print(f"{e}")
 
    logging.basicConfig(
        filemode='w',
        level=logging.DEBUG,
        format='%(asctime)s - %(levelname)s - %(message)s',
        filename=f'./backups/{filename}/{filename}.log'
    )
 
    is_ok = not db_connect(config)
 
    if is_ok:
        cmd = f"PGPASSWORD={config.db_pass} pg_dump -U {config.db_user} {config.db_name} -h {config.db_host} -p {config.db_port} -f ./backups/{filename}/{filename}.backup --format=custom"
 
        inicial = time.time()
 
        try:
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        except Exception as e:
            logging.error(f"{e}")
            print(f"{e}")
 
        final = time.time()
        ejecucion = final - inicial
 
        if result.returncode != 0:
            msg = "Ocurrió un error inesperado o se está ejecutando una instancia de backup en la base"
            logging.error(msg)
            raise Exception(msg)
 
        msg = f"Tiempo de backup para {config.system}: {ejecucion:.2f} segundos"
        logging.info(msg)
        print(msg)
 
        msg = f"Calulando sha256 a {config.system}"
        print(f"\n{msg}\n{len(msg)*'='}\n")

        sha256 =  hash_file(f'./backups/{filename}/{filename}.backup')

        msg = f"Checksum sha256 => {sha256}"
        logging.info(msg)
        print(msg,'\n')
 
        msg = ''
        with open(f"./backups/{filename}/{filename}.log", "r") as f:
            lineas = f.readlines()
            for linea in lineas:
                msg += linea

        telegram = Telegram()
        telegram.send_message(msg)
        msg = f"Mensaje enviado a Telegram"
        logging.info(msg)
        print(msg)

        
    else:
        msg = "Ocurrió un error inesperado o se está ejecutando una instancia de backup en la base"
        logging.error(msg)
        print(msg)

def run():
    envs = get_envs(f"{os.getcwd()}/envs/")
    envs = list(filter(lambda path: "telegram" not in path, envs))

    for env in envs:
        config = EnvConfig(env)
        main(config) 
 
if __name__ == "__main__":
    horario = "03:00"
    schedule.every().day.at(horario).do(run)

    while True:
        schedule.run_pending()
        time.sleep(1)
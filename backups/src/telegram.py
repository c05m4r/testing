import os
import json
import requests
from dotenv import load_dotenv


class Telegram:
    _instance = None

    def __new__(class_, *args, **kwargs):
        if not isinstance(class_._instance, class_):
            class_._instance = object.__new__(class_, *args, **kwargs)
        return class_._instance

    def __init__(self):
        load_dotenv(f"{os.getcwd()}/envs/telegram.env")
        self.__api_key = os.environ.get('API_KEY')
        self.__chat_id = os.environ.get('CHAT_ID')

    @property
    def api_key(self) -> str:
        return self.__api_key

    @property
    def chat_id(self) -> str:
        return self.__chat_id

    def send_message(self, text):
        query = f'https://api.telegram.org/bot{self.api_key}/sendMessage?chat_id={self.chat_id}&text={text}'
        try:
            res = requests.get(query)
            print(res.json())
            if res.status_code != 200:
                raise Exception(f'Error: status code {res.status_code}')
        except Exception as e:
            msg = f'Error: {e}'
            print(msg)
        return res.json()
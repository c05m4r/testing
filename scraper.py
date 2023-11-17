#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import os
import requests
import scrapy
from dotenv import load_dotenv


class Spider(scrapy.Spider):
    load_dotenv()
    name = os.environ.get('NAME')
    allowed_domains = [os.environ.get('ALLOWED_DOMAIN')]
    start_urls = [os.environ.get('START_URL')]

    def __init__(self):
        self.counter = 0        

    def parse(self, response):
        res = requests.get(response.url)
        print(f'({self.counter}) => {response.url}')

        with open("uader_enlaces.csv", "a") as archivo:
            writer = csv.writer(archivo)

            estado = "ERROR"
            if res.status_code == 200:
                estado = "OK"

            row = [
                estado,
                res.status_code,
                response.url
            ]
            writer.writerow(row)

            self.counter += 1

        next_urls = response.css('a::attr(href)').getall()
        for url in next_urls:
            if url is not None:
                yield scrapy.Request(response.urljoin(url))


if __name__ == "__main__":
    from scrapy.cmdline import execute
    execute(["scrapy", "crawl", "uader"])
#!/usr/bin/env python
# -*- coding : utf-8 -*-
from __future__ import absolute_import

import os
import requests
import time
import schedule
import json
import logging
import logging.handlers
from operator import itemgetter
from datetime import date
from firebase import firebase

from mail import sendMail
from mail import sendIntroMail
from settings import FIREBASE_URL
from settings import TOP
from settings import JOB_TIME
from settings import LOG_DIR
from settings import LOG_FILE_NAME
from settings import LOGGER_NAME

FIRE_BASE = firebase.FirebaseApplication(FIREBASE_URL, None)


def setup_logger(logger_name, log_file, level=logging.INFO):
    # create logger with logger_name
    logger = logging.getLogger(logger_name)
    logger.setLevel(level)

    # create file handler which logs even debug messages
    fh = logging.handlers.RotatingFileHandler(
        log_file, maxBytes=1024, backupCount=5)
    fh.setLevel(logging.DEBUG)

    # create console handler with a higher log level
    ch = logging.StreamHandler()
    ch.setLevel(logging.ERROR)

    # create formatter and add it to the handlers
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)

    # add the handlers to the logger
    logger.addHandler(fh)
    logger.addHandler(ch)


def getTodayDate():
    """
    Return today date in ISO format (i.e YEAR-MONTH-DAY)
    """
    today = date.today()
    return today.isoformat()


def fetchItems():
    """
    Return the dict of items from FIREBASE database
    """
    items = FIRE_BASE.get('/availableItems', None)
    return items


def fetchVotes():
    """
    Return the dict of votes from FIREBASE database of today date
    """
    todayDate = getTodayDate()
    items = FIRE_BASE.get('/votes', todayDate)
    return items


def getItemsByCategory(items, votes):
    """
    Return the items in category wise
    """
    result = {}
    if votes:
        for item_id, voters in votes.iteritems():
            total_voters = len(voters) - 1
            item_name = items[item_id]['name']
            item_cat = items[item_id]['category']
            if item_cat in result:
                result[item_cat].append(
                    {'item_name': item_name, 'votes': total_voters})
            else:
                result[item_cat] = [
                    {'item_name': item_name, 'votes': total_voters}]
    return result


def getTopItems(result, top=3):
    """
    Return the top items of each category of items
    """
    ret = {}
    if result:
        for category, items in result.iteritems():
            items = sorted(items, key=itemgetter('votes'), reverse=True)
            ret[category] = items[:top]
    return ret


def job():
    # Set Logger Object
    logger = logging.getLogger(LOGGER_NAME)

    logger.info('Job Start')
    # Store the results
    result = {}

    # Get Items
    items = fetchItems()

    # Get Votes
    votes = fetchVotes()

    # Get items by category
    result = getItemsByCategory(items, votes)

    # Get top items
    result = getTopItems(result, TOP)

    # Save Result to file
    filename = 'logs/' + getTodayDate() + '.log'
    with open(filename, 'w') as f:
        data = result
        if not data:
            data = {'No data for today'}
        f.write(json.dumps(result, ensure_ascii=False))

    # Send mail to users
    print 'Result:: ', result
    if result:
        sendMail(result)
    logger.info('Job Completed')

def job2():
    # Set Logger Object
    logger = logging.getLogger(LOGGER_NAME)

    logger.info('Job2 Start')
    # send intro mail to users
    sendIntroMail()
    print 'Okkk'

    logger.info('Job2 Completed')

# schedule.every().day.at(JOB_TIME).do(job)
# schedule.every(1).minutes.do(job2)

if __name__ == '__main__':
    # Create a logs direcory if not exist
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    # Setup Logger
    log_file = LOG_DIR + '/' + LOG_FILE_NAME
    setup_logger(LOGGER_NAME, log_file, level=logging.DEBUG)

    job2()
    # Run Scheduler
    # while True:
        # schedule.run_pending()
        # time.sleep(1)

#!/usr/bin/env python
# -*- coding : utf-8 -*-

import requests
import time
from operator import itemgetter
from datetime import date
from firebase import firebase
from mail import sendMail

from settings import TOP

FIRE_BASE = firebase.FirebaseApplication(
    'https://ophiofoodly.firebaseio.com', None)


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
    for item_id, voters in votes.iteritems():
        total_voters = len(voters)
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
    for category, items in result.iteritems():
        items = sorted(items, key=itemgetter('votes'), reverse=True)
        ret[category] = items[:top]
    return ret


def main():
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

    # Send mail to users
    sendMail(result)

if __name__ == "__main__":
    main()

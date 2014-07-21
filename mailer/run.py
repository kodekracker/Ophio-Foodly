#!/usr/bin/env python
# -*- coding : utf-8 -*-

import requests
import time
from operator import itemgetter
from datetime import date
from firebase import firebase
from mail import sendMail

FIRE_BASE = firebase.FirebaseApplication('https://ophiofoodly.firebaseio.com', None)

def getTodayDate():
    today = date.today()
    return today.isoformat()

def fetchItems():
    items = FIRE_BASE.get('/availableItems',None)
    return items

def fetchVotes():
    todayDate = getTodayDate()
    items = FIRE_BASE.get('/votes', todayDate)
    return items

def getTopItems(result,top=3):
    ret = {}
    for category, items in result.iteritems():
        items = sorted(items,key= itemgetter('votes'), reverse=True)
        ret[category] = items[:top]
    return ret

def getItemsByCategory(items, votes):
    result = {}
    for item_id, voters in votes.iteritems():
        total_voters = len(voters)
        item_name = items[item_id]['name']
        item_cat = items[item_id]['category']
        if item_cat in result:
            result[item_cat].append({'item_name':item_name,'votes':total_voters})
        else:
            result[item_cat]= [{'item_name':item_name,'votes':total_voters}]
    return result

def main():
    result = {}

    # get Items
    items = fetchItems()

    # get Votes
    votes = fetchVotes()

    # get items by category
    result = getItemsByCategory(items, votes)

    # get top items
    result = getTopItems(result,2)

    # send mail to users
    sendMail(result)

if __name__ == "__main__":
    main()

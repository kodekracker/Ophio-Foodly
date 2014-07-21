#! /usr/bin/env python
# -*- coding : utf-8 -*-

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from mako.template import Template

def sendMail(data):
    smtp_user = "theskumar"
    smtp_pwd = "abc123"

    FROM = 'sunny@ophio.co.in'
    TO = ['sunnylautner40@gmail.com']
    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Top Eateries at Foodly"
    msg['From'] = "sunny@ophio.co.in"
    msg['To'] = "akshay@ophio.co.in"

    # Create the body of the message (a plain-text and an HTML version).
    mytemplate = Template(filename='template.html', module_directory='/tmp/mako_modules')
    html = mytemplate.render(data=data)

    # Record the MIME types of both parts - text/plain and text/html.
    part2 = MIMEText(html, 'html')

    # Attach parts into message container.
    # According to RFC 2046, the last part of a multipart message, in this case
    # the HTML message, is best and preferred.
    msg.attach(part2)


    try:
        #server = smtplib.SMTP(SERVER)
        server = smtplib.SMTP('smtp.sendgrid.net') #or port 465 doesn't seem to work!
        server.starttls()
        server.login(smtp_user, smtp_pwd)
        server.sendmail(FROM, TO, msg.as_string())
        #server.quit()
        server.quit()
        print 'successfully sent the mail'
    except:
        print "failed to send mail"

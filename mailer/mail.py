#! /usr/bin/env python
# -*- coding : utf-8 -*-

import smtplib
from email.mime.multipart import MIMEMultipart
from mako.template import Template

from settings import FROM
from settings import Top
from settings import SMTP_USER
from settings import SMTP_PASSWORD

def sendMail(data):
    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')

    msg['Subject'] = "Top Eateries at Foodly"
    msg['From'] = "sunny@ophio.co.in"
    msg['To'] = "akshay@ophio.co.in"

    # Create the body of the message (an HTML version).
    mytemplate = Template(filename='template.html', module_directory='/tmp/mako_modules')
    html = mytemplate.render(data=data)

    # Record the MIME types of text/html.
    part = MIMEText(html, 'html')

    # Attach part into message container.
    msg.attach(part)

    try:
        # Or port 465 doesn't seem to work!
        server = smtplib.SMTP('smtp.sendgrid.net')
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(FROM, TO, msg.as_string())
        server.quit()
        print 'Successfully sent the mail'
    except Exception as e:
        print "Failed to send mail :: ", str(e)

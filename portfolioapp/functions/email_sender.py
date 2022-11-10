from mysite import settings
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

smtp_port = 465
smtp_server = "smtp.gmail.com"
email_from = settings.CUSTOM_EMAIL_SERVICE_SENDER_EMAIL
pswd = settings.CUSTOM_EMAIL_SERVICE_SENDER_EMAIL_PASSWORD

from django.template.loader import render_to_string

def send_message(email,subject,message_str):
    simple_mail_context = ssl.create_default_context()
    try:
        print("connecting to server")
        server_connection = smtplib.SMTP_SSL(smtp_server,smtp_port,context=simple_mail_context)
        print("logging in..")
        server_connection.login(email_from,pswd)
        print("Connected to server")

        print("-"*50)

        message = MIMEMultipart("alternative")
        message["Subject"] = "Someone sent a message from your website"
        message["From"] = email_from
        message["To"] = settings.MESSAGE_EMAIL

        html = render_to_string("portfolioapp/message_template.html",{
            "name":email,
            "subject":subject,
            "message":message_str
        })

        html_message = MIMEText(html,"html")
        message.attach(html_message)

        print("Sending email..")
        server_connection.sendmail(email_from,settings.MESSAGE_EMAIL,message.as_string())
        print("Sent")
        server_connection.quit()
        return True

    except Exception as error:
        print("Exception:",error)
        return False

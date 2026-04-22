import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pg8000.native


def save_to_db(name, phone, message):
    try:
        con = pg8000.native.Connection(dsn=os.environ['DATABASE_URL'])
        con.run(
            "INSERT INTO leads (name, phone, message) VALUES (:name, :phone, :msg)",
            name=name, phone=phone, msg=message or None
        )
        con.close()
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту и сохраняет в базу данных"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'Заполните имя и телефон'})}

    # Сохраняем в базу
    save_to_db(name, phone, message)

    # Отправляем письмо
    smtp_host = 'smtp.yandex.ru'
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    to_email = 'hr.jax@yandex.ru'

    html = f"""
    <h2>Новая заявка с сайта hr-irk.ru</h2>
    <p><b>Имя:</b> {name}</p>
    <p><b>Телефон:</b> {phone}</p>
    <p><b>Сообщение:</b> {message or '—'}</p>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {name}'
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}
FROM python:3.10

ADD * ./

RUN pip install -r ./requirements.txt
EXPOSE 8090

CMD ["python3","./manage.py.py runserver 192.46.214.175:8090"]
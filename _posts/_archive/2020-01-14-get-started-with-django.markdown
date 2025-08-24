---
layout: post
title:  "Hello Django!"
date:   2020-01-14 17:00:00 +0900
categories: jekyll update
---
# 환경설정
## Python venv 생성
프로젝트 폴더에 venv(Virtual Environment)를 만든다.

`python3 -m venv [directory_name]`

```zsh
python3 -m venv venv
```

현재 폴더에 venv를 활성화 시킨다.

```zsh
venv/Scripts/activate.bat
```


# Django 시작하기
## Django 설치
pip 명령을 사용하여 Django를 설치한다.

```zsh
pip install django
```


## Django 프로젝트 생성
Django Project를 생성한다.

`django-admin startproject [project_name]`

```zsh
django-admin startproject django_project
```


## Django 서버 실행
프로젝트 생성 후 동작을 확인한다.

```zsh
cd django_project
python manage.py runserver
```

| ![image](https://hwangsb.github.io/assets/images/2020-01-14-hello-django/hello_django_0.png) |
|:--:|
| 127.0.0.1:8000으로 접속한 모습 |

`Ctrl + C`로 종료할 수 있다.


## Django 앱 생성
Django App을 생성한다.

`python manage.py startapp [app_name]`

```zsh
python manage.py startapp django_app
```


# Django 프로젝트 구조
## Project
```text
> django_project/
    __init__.py
    asgi.py
    apps.py
    models.py
    tests.py
    views.py
```


## App
```text
> django_app/
    > migrations/
        __init__.py
    > templates/
        home.html
    __init__.py
    admin.py
    tests.py
    views.py
```


## 핵심 파일
위 파일들이 주로 변경되는 파일이다.

`django_project > urls.py`

`django_project > settings.py`

`django_app > views.py`

`django_app > models.py`


# Django에서 특수하게 사용되는 문법
html 파일 안에 Python과의 연동 편의성을 위해 특수한 문법을 제공한다.

`{{value}}`
Python 값을 출력한다.

`{% raw %}{% begin python keyword %}{% endraw %}`
Python 키워드를 시작하는 부분
ex) for, if

`{% raw %}{% end python keyword %}{% endraw %}`
Python 키워드를 끝내는 부분
ex) endfor endif


# 참고
[Django 설치하기](https://tutorial.djangogirls.org/ko/django_installation/)

[나의 첫 번째 Django 프로젝트!](https://tutorial.djangogirls.org/ko/django_start_project/)

[파이썬 웹프로그래밍 - 장고(Django)설치](https://offbyone.tistory.com/77)


# Development Environment

| Type | OS | IDE | Language | Framework |
|:--|:--:|:--:|:--:|:--:|
| Name | Windows 10 64bit | Visual Studio Code | Python | Django |
| Version | 1909 | 1.41.1 | 3.8.1 | 3.0.2 |
| Build | 18363.418 |

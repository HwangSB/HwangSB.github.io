---
layout: post
title:  "Django Caculator"
date:   2020-01-15 17:00:00 +0900
categories: jekyll update
---
# 온라인 계산기 만들기
## 개요
버튼식 계산기가 아닌 수식을 입력하는 계산기를 만든다.


## templates
유저에게 정보를 출력할 Template을 만든다.

django_app 폴더 안에 `templates` 폴더를 만들고

계산식을 입력할 `home.html`과 계산 결과를 보여줄 `result.html`을 생성한다.


## home.html
사용자에게 입력을 받을 텍스트필드와 계산 결과창으로 이동할 버튼을 만들고 
result 창으로 이동하도록 action을 걸어준다.

```html
<h1>Calculator</h1>
<h3>enter your expression</h3>

<form action="{% raw %} {% url 'result' %} {% endraw %}">
    <textarea cols="50" rows="1" name="expression_text"></textarea>
    <br/>
    <input type="submit" value="calculate!">
</form>
```


## result.html
home.html에서 입력한 수식과 계산 결과를 result 리스트로 받아 출력한다.

`go to home` 버튼을 누르면 다시 홈으로 이동한다.

```html
<h1>Result</h1>
<h3>{{result.0}} = {{result.1}}</h3>
<form action="{% raw %} {% url 'home' %} {% endraw %}">
    <input type="submit" value="go to home">
</form>
```


## views.py
home과 result 화면을 출력하는 함수를 추가한다.

```python
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')


def result(request):
    expression = request.GET['expression_text']
    return render(request, 'result.html', {'result': [expression, eval(expression)]})

```


## settings.py
INSTALLED_APPS 리스트에 App 경로를 추가해준다.

```python
# --<snip>--
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_app.apps.DjangoAppConfig',
]
#--<snip>--
```


## urls.py
urlpatterns 리스트에 home과 result 경로를 추가해준다.

```python
# --<snip>--
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('result/', views.result, name='result')
]
#--<snip>--
```


# 결과

| ![image](https://hwangsb.github.io/assets/images/2020-01-15-django-calculator/django_calculator_0.png) |
|:--:|
| home 페이지 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-15-django-calculator/django_calculator_1.png) |
|:--:|
| result 페이지 |


# Development Environment

| Type | OS | IDE | Language | Framework |
|:--|:--:|:--:|:--:|:--:|
| Name | Windows 10 64bit | Visual Studio Code | Python | Django |
| Version | 1909 | 1.41.1 | 3.8.1 | 3.0.2 |
| Build | 18363.418 |

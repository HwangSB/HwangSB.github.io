---
layout: post
title:  "Add Calculation History Feature"
date:   2020-01-17 17:00:00 +0900
categories: jekyll update
---
# 계산 기록 추가하기
## 개요
계산 기록을 CRUD(Create Read Update Delete) 하는 기능을 추가한다.


## models.py
수식과 답을 저장할 데이터베이스 형식을 python class로 구현할 수 있다.

models.Model을 상속받는 Expression class 생성한다.

식과 답을 저장하기 위해 value와 answer CharField를 만든다.

```python
from django.db import models


class Expression(models.Model):
    value = models.CharField(max_length=50)
    answer = models.CharField(max_length=100, default='0')

    def __str__(self):
        return str(self.id) + '. ' + self.value + ' = ' + self.answer

```


## 데이터 migration 생성 & migrate
모델을 만들었다면 데이터베이스에 적용을 위해 migration을 진행해야한다.

```zsh
python manage.py makemigration
python manage.py migrate
```


## views.py
### 만든 모델을 import 해준다.
```python
from django.shortcuts import render
from .models import Expression
```

### Read
데이터베이스에 저장된 객체를 모두 읽어 home.html에 paramater로 전달한다.

```python
def home(request):
    expressions = Expression.objects.all()
    return render(request, 'home.html', {'expressions': expressions})

```

### Create
expression_text에 입력된 수식을 데이터베이스에 저장한다.

expression_text에 값이 입력된 상태로 Calculate! 버튼을 눌렀다면 식과 답을 데이터베이스에 저장하고 create-history.html에 식과 답을 parameter로 전달한다.

expression_text에 아무것도 입력하지 않고 Calculate! 버튼을 눌렀다면 create-history.html에 빈 리스트를 parameter로 전달한다.

```python
def create_history(request):
    expression = request.GET['expression_text']

    if expression != '':
        Expression.objects.create(value=expression, answer=eval(expression))
        return render(request, 'create-history.html', {'result': [expression, str(eval(expression))]})

    return render(request, 'create-history.html', {'result': []})

```

### Delete
리스트의 수식들 중 삭제 버튼이 눌린 항목을 id값으로 찾아 데이터베이스에서 삭제한다.

```python
def delete_history(request):
    selection_id = request.GET['delete_button']
    expression = Expression.objects.get(id=int(selection_id))
    expression.delete()
    return render(request, 'delete-history.html', {'expression': expression})
```

### Update
리스트의 수식들 중 수정 버튼이 눌린 항목을 id값으로 찾아 식을 1 + 1 로, 답을 2로 수정한다.

```python
def update_history(request):
    selection_id = request.GET['update_button']
    expression = Expression.objects.get(id=int(selection_id))
    expression.value = '1 + 1'
    expression.answer = '2'
    expression.save()
    return render(request, 'update-history.html')

```


## Templates
Bootstrap을 적용하여 문서들을 만들어 준다.

### home.html
```html
<head>
    {% raw %} {%  load static  %} {% endraw %}
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <h1 class="display-4">Calculator</h1>

        <br>
        
        <ul class="list-group">
            {% raw %} {%  for expression in expressions  %} {% endraw %}
                <li  class="list-group-item d-flex justify-content-between align-items-center">
                    <a class="lead">
                        {{expression.value}} = {{expression.answer}}
                    </a>
                    <div>
                        <div style="float: left;">
                            <form action="{% raw %} {%  url 'update-history'  %} {% endraw %}" style="margin: 0px; padding: 0px;">
                                <div class="form-group" style="margin: 0px; padding: 0px;">
                                    <button class="btn btn-default" type="submit" name="update_button" value="{{expression.id}}">
                                        <img src="{% raw %} {%  static 'icons/pencil.svg'  %} {% endraw %}" width="24px" height="24px"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div style="float: left;">
                            <form action="{% raw %} {%  url 'delete-history'  %} {% endraw %}" style="margin: 0px; padding: 0px;">
                                <div class="form-group" style="margin: 0px; padding: 0px;">
                                    <button class="btn btn-default" type="submit" name="delete_button" value="{{expression.id}}">
                                        <img src="{% raw %} {%  static 'icons/x-square.svg'  %} {% endraw %}" width="24px" height="24px"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </li>
            {% raw %} {%  endfor  %} {% endraw %}
        </ul>

        <br>

        <form action="{% raw %} {%  url 'create-history'  %} {% endraw %}">
            <div class="form-group">
                <div class="input-group mb-3">
                    <input name="expression_text" type="text" class="form-control" placeholder="enter your expression">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="submit">Calculate!</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!--scripts-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
```

### create-history.html
```html
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <h1 class="display-4">Create History</h1>

        <br>

        {% raw %} {%  if result  %} {% endraw %}
            <p class="lead">{{result.0}} = {{result.1}}</p>
        {% raw %} {%  else  %} {% endraw %}
            <p class="lead">No Expression</p>
        {% raw %} {%  endif  %} {% endraw %}

        <br>

        <form action="{% raw %} {% url 'home' %} {% endraw %}">
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Go to home</button>
            </div>
        </form>
    </div>
    
    <!--scripts-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
```


### update-history.html
```html
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <h1 class="display-4">Update History</h1>

        <br>

        <p class="lead">Update expression to: 1 + 1 = 2</p>

        <br>

        <form action="{% raw %} {% url 'home' %} {% endraw %}">
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Go to home</button>
            </div>
        </form>
    </div>
    
    <!--scripts-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>

```


### delete-history.html
```html
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <h1 class="display-4">Delete History</h1>

        <br>

        <p class="lead">Deleted expression: {{expression.value}} = {{expression.answer}}</p>

        <br>

        <form action="{% raw %} {% url 'home' %} {% endraw %}">
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Go to home</button>
            </div>
        </form>
    </div>
    
    <!--scripts-->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
```


## urls.py
url을 view와 연결시켜준다.

```python
from django.contrib import admin
from django.urls import path
from django_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Root URL로 접속시 views의 home 함수로 연결
    path('', views.home, name='home'),
    # create-history URL로 접속시 views의 create_history 함수로 연결
    path('create-history/', views.create_history, name='create-history'),
    # delete-history URL로 접속시 views의 delete_history 함수로 연결
    path('delete-history/', views.delete_history, name='delete-history'),
    # update-history URL로 접속시 views의 update_history 함수로 연결
    path('update-history/', views.update_history, name='update-history'),
]

```


## 결과

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_0.png) |
|:--:|
| home 페이지에서 수식 입력 후 Calculate! 버튼 클릭 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_1.png) |
|:--:|
| create-history 페이지 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_2.png) |
|:--:|
| home 페이지에 입력한 수식이 계산 결과와 함께 추가된 모습 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_3.png) |
|:--:|
| home 페이지에서 첫번째 항목의 삭제 버튼 클릭 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_4.png) |
|:--:|
| delete-history 페이지 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_5.png) |
|:--:|
| home 페이지에 첫번째 항목이 삭제된 모습 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_6.png) |
|:--:|
| home 페이지에서 마지막 항목의 수정 버튼 클릭 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_7.png) |
|:--:|
| update-history 페이지 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_8.png) |
|:--:|
| home 페이지에 마지막 항목이 1 + 1 = 2로 수정된 모습 |


## db.sqlite3

| ![image](https://hwangsb.github.io/assets/images/2020-01-17-django-calculator-database/django_calculator_database_9.png) |
|:--:|
| db.sqlite3에 저장된 모습 |


# Development Environment

| Type | OS | IDE | Language | Framework | Library |
|:--|:--:|:--:|:--:|:--:|:--:|
| Name | Windows 10 64bit | Visual Studio Code | Python | Django | Bootstrap |
| Version | 1909 | 1.41.1 | 3.8.1 | 3.0.2 | 4.4.1 |
| Build | 18363.418 |

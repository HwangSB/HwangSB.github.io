---
layout: post
title:  "Manage Static & Media"
date:   2020-01-20 17:00:00 +0900
categories: jekyll update
---
# Blog 만들기
지금까지 공부한 내용을 바탕으로 간단한 페이지를 만들었다.


# Template
## home.html
상단에 배너이미지를 표시하고 포스팅을 할 때 카드를 추가한다.
```html
{% raw %} {%  load static  %} {% endraw %}

<!DOCTYPE html>
<html lang="ko">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Hwang's Blog</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a class="navbar-brand" href="#">Hwang's Blog</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="#">Features</a>
                <a class="nav-item nav-link" href="#">Pricing</a>
                <a class="nav-item nav-link" href="#">Disabled</a>
            </div>
        </div>
    </nav>

    <img class="w-100 h-100" src="{% raw %} {%  static 'banner.png'  %} {% endraw %}" alt="...">
    <div class="jumbotron jumbotron-fluid mb-0">
        <div class="container">
            <h1 class="display-4">My Awesome Blog</h1>
            <p class="lead">This is hwang's awesome blog. i want to this text long, this project used django framework
                and bootstrap library.</p>
        </div>
    </div>

    <div class="py-5">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-3">
                {% raw %} {%  for post in posts  %} {% endraw %}
                <div class="col mb-4">
                    <div class="card h-100">
                        {% raw %} {%  if post.media  %} {% endraw %}
                        <img src="{{post.media.url}}" class="card-img-top" alt="...">
                        {% raw %} {%  else  %} {% endraw %}
                        <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                        {% raw %} {%  endif  %} {% endraw %}
                        <div class="card-body">
                            <h5 class="card-title">{{post.title}}</h5>
                            <p class="card-text">{{post.content}}</p>
                            <a class="card-link" href="#">View</a>
                            <a class="card-link" href="#">Edit</a>
                        </div>
                    </div>
                </div>
                {% raw %} {%  endfor  %} {% endraw %}
            </div>
        </div>
    </div>

    <footer class="text-muted fixed-bottom bg-light">
        <div class="container">
            <div class="text-center py-3">© 2020 Copyright:
                <a href="#"> hwangsb.github.io </a>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
</body>

</html>
```


# static(정적 파일) 관리
## settings.py
하단에 아래 설정을 추가해 준다.

```python
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'Blog', 'static'),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
```


## app에 static 폴더 추가
static 폴더 아래에 banner.png 파일을 추가한다.

| ![image](https://hwangsb.github.io/assets/images/2020-01-20-django-static-and-media/django_static_and_media_0.png) |
|:--:|
| banner.png 이미지 |


## static 파일 모으기
이 글에서는 개발모드로 웹사이트를 실행하기 때문에 collectstatic을 생략했지만 배포시에는 모으기를 해줘야 한다.

[Deploy] Django 프로젝트 배포하기 - 4. Static 파일](https://nachwon.github.io/django-deploy-4-static/) 글을 참고했다.


## 결과
Bootstrap을 사용하여 작은 화면에서도 효과적으로 표시된다.

| ![image](https://hwangsb.github.io/assets/images/2020-01-20-django-static-and-media/django_static_and_media_1.png) |
|:--:|
| 상단에 배너 이미지가 표시된다 |


# media(동적 파일) 관리
## settings.py
하단에 아래 설정을 추가해 준다.

```python
MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```


## urls.py
하단에 media 파일을 올릴 경로를 추가한다.

```python
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```


## 결과
admin 페이지에서 게시물을 작성하면 카드 형태로 목록이 보인다.

| ![image](https://hwangsb.github.io/assets/images/2020-01-20-django-static-and-media/django_static_and_media_2.png) |
|:--:|
| admin 페이지에서 글을 작성한다 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-20-django-static-and-media/django_static_and_media_3.png) |
|:--:|
| 업로드한 글과 이미지가 표시된다 |

| ![image](https://hwangsb.github.io/assets/images/2020-01-20-django-static-and-media/django_static_and_media_4.png) |
|:--:|
| 다른 사진도 잘 표시된다 |


# 참고
[[Deploy] Django 프로젝트 배포하기 - 4. Static 파일](https://nachwon.github.io/django-deploy-4-static/)

[장고 미디어 파일 (Media Files) - 사진업로드, 파일서빙](https://wayhome25.github.io/django/2017/05/10/media-file/)

[더미 이미지 넣기](https://placeholder.com/)


# Development Environment

| Type | OS | IDE | Language | Framework | Library |
|:--|:--:|:--:|:--:|:--:|:--:|
| Name | Windows 10 64bit | Visual Studio Code | Python | Django | Bootstrap |
| Version | 1909 | 1.41.1 | 3.8.1 | 3.0.2 | 4.4.1 |
| Build | 18363.418 |

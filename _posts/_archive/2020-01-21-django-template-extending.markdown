---
layout: post
title:  "Template Extending"
date:   2020-01-21 17:00:00 +0900
categories: jekyll update
---
# 개요
템플릿 확장 기능을 사용하여 공통으로 사용되는 코드를 줄일 수 있다.

Manage Static & Media 포스팅에 사용한 코드를 약간 수정한다.

# Template
## base.html
모든 화면에서 Navbar와 Sticky footer를 공통으로 사용한다.

공통으로 사용할 부분만 코드를 작성하고 바뀔 부분은 {% raw %} {%  block name  %} {% endraw %} 과 {% raw %} {%  endblock  %} {% endraw %} 으로 감싸준다.

```html
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

    {% raw %} {%  block content  %} {% endraw %}
    <!-- some content for template extending... -->
    {% raw %} {%  endblock  %} {% endraw %}

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


## home.html
{% raw %} {%  extends 'base.html'  %} {% endraw %} 로 확장할 템플릿을 명시해주고 {% raw %} {%  block content  %} {% endraw %} 와 {% raw %} {%  endblock  %} {% endraw %} 으로 코드가 어디에 들어갈 내용인지 범위를 지정해준다.

```html
{% raw %} {%  extends 'base.html'  %} {% endraw %}
{% raw %} {%  load static  %} {% endraw %}

{% raw %} {%  block content  %} {% endraw %}
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
{% raw %} {%  endblock  %} {% endraw %}
```


# 참고
[템플릿 확장하기](https://tutorial.djangogirls.org/ko/template_extending/)


# Development Environment

| Type | OS | IDE | Language | Framework | Library |
|:--|:--:|:--:|:--:|:--:|:--:|
| Name | Windows 10 64bit | Visual Studio Code | Python | Django | Bootstrap |
| Version | 1909 | 1.41.1 | 3.8.1 | 3.0.2 | 4.4.1 |
| Build | 18363.418 |

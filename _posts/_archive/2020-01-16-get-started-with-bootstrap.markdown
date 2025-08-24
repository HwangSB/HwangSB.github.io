---
layout: post
title:  "Get Started with Bootstrap"
date:   2020-01-16 17:00:00 +0900
categories: jekyll update
---
# Bootstrap 추가하기
## 개요
Bootstrap은 반응형 웹을 만들 수 있는 프론트엔드 라이브러리이다.

BootstrapCDN을 사용하여 빠르게 시작 할 수 있다.

html 문서의 `<header>` 태그에 아래 코드를 추가한다.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```

html 문서의 `<body>` 태그에 아래 코드를 추가한다.

```html
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
```

본격적으로 웹페이지를 만들기 위해 [샘플 페이지](https://getbootstrap.com/docs/4.4/examples/)를 참고하면 좋다.


## test.html
Bootstrap이 포함된 기본 문서의 형태는 아래와 같다.

```html
<!DOCTYPE html>
<html lang="ko">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <title>Bootstrap Test</title>
    </head>
    <body>
        <h1>Hello world!</h1>

        <!-- JavaScript -->
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
</html>
```


## 결과

| ![image](https://hwangsb.github.io/assets/images/2020-01-16-bootstrap/bootstrap_0.png) |
|:--:|
| test.html |


# 참고
[Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/)


# Development Environment

| Type | OS | IDE | Language | Framework | Library |
|:--|:--:|:--:|:--:|:--:|:--:|
| Name | Windows 10 64bit | Visual Studio Code | Python | Django | Bootstrap |
| Version | 1909 | 1.41.1 | 3.8.1 | 3.0.2 | 4.4.1 |
| Build | 18363.418 |

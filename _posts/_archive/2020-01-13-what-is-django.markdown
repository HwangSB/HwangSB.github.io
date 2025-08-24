---
layout: post
title:  "What is Django?"
date:   2020-01-13 17:00:00 +0900
categories: jekyll update
---
# 개요
Django 프로젝트를 시작하기 전에 Django가 어떻게 돌아가는지 알아보았다.

위키백과에서는 다음과 같이 설명하고 있다.

```text
장고(Django, FAQ 발음으로는 "쟁고"(IPA: [ˈdʒæŋgoʊ]))는 파이썬으로 작성된 오픈 소스 웹 애플리케이션 프레임워크로, 모델-뷰-컨트롤러(MVC) 패턴을 따르고 있다. 현재는 장고 소프트웨어 재단에 의해 관리되고 있다.

고도의 데이터베이스 기반 웹사이트를 작성하는 데 있어서 수고를 더는 것이 장고의 주된 목표이다. 장고는 콤포넌트의 재사용성(reusability)과 플러그인화 가능성(pluggability), 빠른 개발 등을 강조하고 있다. 또한, "DRY(Don't repeat yourself: 중복배제)" 원리를 따랐다. 설정 파일부터 데이터 모델에까지 파이썬 언어가 구석구석에 쓰였다.

인스타그램, NASA, 빗버켓, Disqus, 모질라에서 장고를 사용하는 것으로 알려져있다.
```

[Django 소개](https://developer.mozilla.org/ko/docs/Learn/Server-side/Django/Introduction)
에 잘 설명 되어있다.

## URLs
HTTP요청을 연결된 View로 보내준다.

`urls.py` 파일에 기술한다.

## Models
데이터 구조를 정의하고 관리한다.

`models.py` 파일에 기술한다.

## View
URL을 통해 들어온 요청을 받고 Model, Template과 통신하여 화면에 출력한다.

`views.py`

## Templates
실제로 화면에 보여지게될 레이아웃 구조를 정의한다.

`templates/*.html`

---
id: build_a_blog_using_astro
title: Astro를 사용해 블로그 만들어보기
description: Astro를 사용해 블로그 만들어보기
publishDate: 2025-05-31
tags: ["astro", "web"]
---

# Astro를 사용해 블로그 만들어보기

지인의 추천으로 [Astro](https://astro.build/)라는걸 알게되었다.  
메인 페이지에도 떡하니 있듯이 마케팅 사이트, 블로그, 온라인 쇼핑몰 등에 최적화된 웹 프레임워크라는걸 알 수 있었다.  

일단 나는 마케팅 사이트와 온라인 쇼핑몰을 운영하지 않으니 블로그를 만들어보기로했다.  

그리고 나는 Astro에 대해 잘 알고 있지 않다.  
내가 설명한 방법과 다른 방법이 있다고 해도 이해하고 넘어가주면 좋겠다.

## Astro를 사용하기

Astro를 사용하기 위해선 일단 Astro 프로젝트를 세팅해야한다.  
```sh
npm create astro@latest
```
이 명령어로 Astro 프로젝트를 만들 수 있다.  

## 페이지 작성하기

Astro 문서 페이지를 잘 읽어보지는 않았지만 'astro'라는 독립된 파일 확장자를 사용하고 있었기에, '얘는 뭔가 다르구나'라는 생각을 했다.

일단 내 기준 생전 처음 보진 않지만 뭔가 처음 보는 문법이였다.  

`---` 사이에 빌드 시 실행 될 TypeScript를 넣고, 그 밑에는 JavaScript JSX를 넣는 방식이였다.  

뭔지 모르겠다면 [이 블로그의 깃허브](https://github.com/Pro203S/dev-blog)를 참고하면 좋을 것 같다.  

## 컴포넌트 만들기

Astro에서도 컴포넌트를 만들 수 있다.  
페이지와의 차이점은 페이지는 `<html>` 태그를 작성해야하지만 컴포넌트는 그딴거 필요 없다.  

## css 작성하기

Astro에서 css를 어떻게 쓰냐..고 하면 아래 2가지 방법이 있다.

1. 그냥 `<style>` 태그에 때려박기
2. `*.module.css` 파일 만들기

`*.module.css` 파일은 TypeScript 부분에 넣을 수 있고, `<style>` 태그는 JavaScript JSX에 넣어야한다.  

1번 방법은 아래처럼 사용할 수 있고,

```astro
<style>
    .container {
        display: flex;
    }

    .text {
        font-size: 1.01rem;
    }
</style>

<div class={css.container}>
    <span class={css.text}>Text</span>
</div>
```

2번 방법은 아래 처럼 사용할 수 있다.

```astro
---
import css from './component.module.css';
---

<div class={css.container}>
    <span class={css.text}>Text</span>
</div>
```

React를 많이 사용해온 나로써는, 2번 방법이 익숙해 저 방법을 사용하고 있다.

## Astro를 사용하면서 느낀 점

어...  
첫번째로 React보다는 단순하게 생겼?다.  
HTML, CSS, JavaScript정도만 배워도 간단히 웹사이트를 만들 수 있을 것 같다.  

두번째로 밑에 JSX 부분의 `<script>` 태그에 타입스크립트가 도입되었으면 좋겠다.  
세번째로 React가 너무 익숙해져버린 나머지 `useRef`가 아닌 `document.querySelector`를 쓰고 있다는게 뭔가 익숙하지 않았다.

앞으로는 다시 쓸 일 없을 것 같다.  
그래도 블로그 운영에는 좋은게 마크다운 파서가 내장되어있어 자동으로 파싱이 된다.  

## 마치면서

지인의 추천으로 처음 알았는데 이번에 쓰고 별로 쓸 일은 없을 것 같다.  
그래도 재미있는 프레임워크였다.  
한 번 쯤 써볼 가치는 있다고 생각하는 웹 프레임워크였다.

---
id: use_google_oauth
title: Google의 OAuth2 사용하기
description: 내가 볼려고 쓰는 글
publishDate: 2026-09-22
tags: ["web", "oauth"]
---

# Google의 OAuth2 사용하기

살면서 구글 계정을 한 번도 만들어본 적이 없는 사람은 드물것이다.  
서비스를 만들며 자체 계정 시스템을 도입하는건 너무 귀찮으니까 구글 OAuth2를 쓰는게 낫다고 판단해서 구글 사이트를 들어갔는데  
Client ID, Client Secret은 만들 수 있었지만 사용법은 뭔 [RFC 6749](https://www.rfc-editor.org/info/rfc6749/)라도 읽으라는건지 별로 없었다.  

그래서 여기에 정리해보는 문서다.

**여기서는 웹 구글 OAuth2에 대해 다룬다. Android나 iOS 등 그 외에 대해선 따로 찾아보길 바란다.**

## Client ID, Client Secret 만들기

[https://console.cloud.google.com/auth/clients](https://console.cloud.google.com/auth/clients)에 방문해준다.  
여기서 클라이언트를 만들거나, 인증 정보를 만든 적이 없는 프로젝트는 여기서 만들 수 있다.  

~~여기는 누구나 할 수 있을거라고 믿고 넘어간다~~

## 로그인 URL 만들기

기본 URL은 아래와 같다.  

`https://accounts.google.com/o/oauth2/v2/auth`

아래를 쿼리 파라메터로 전달해주면 된다.  

|이름|값|
|-|-|
|client_id|위에서 발급한 Client ID|
|redirect_uri|로그인 후 Redirect 될 URI|
|response_type|일단 여기선 code로 안내함|
|scope|필요한 권한|
|state|필요는 없지만 **권장사항**이다|
|prompt|"none" \| "consent" \| "select_account"|

`prompt`의 값은 아래와 같다.  

|값|설명|
|-|-|
|none|아무것도 띄우지 않는다. (자동 로그인)|
|consent|동의 창을 다시 한 번 띄운다.|
|select_account|계정 선택 창을 띄운다.|

참고로 `none`은 사용자가 이미 한 번 로그인 했어야 자동 로그인이 된다.  
로그인 하지 않았던 사용자면 동의 화면을 한 번 더 띄울 수 있다.  

`scope`의 목록은 여기서 확인할 수 있다.  
[https://developers.google.com/identity/protocols/oauth2/scopes](https://developers.google.com/identity/protocols/oauth2/scopes)

## OAuth2 콜백

콜백은 아래 쿼리 파라메터와 같이 온다.  

|이름|값|
|-|-|
|code|authorization_code|
|iss|항상 https://accounts.google.com|
|state|위에서 썼던 state|

만약 오류가 났다면 아래와 같이 온다.  

|이름|값|
|-|-|
|error|오류 코드|
|error_description|오류 설명|

## ID Token 발급

아래와 같이 Google API에 요청을 하면 ID Token을 받을 수 있을 것이다.  

`https://oauth2.googleapis.com/token`에 `POST`로 아래 헤더와 데이터를 담고 요청

|헤더 이름|값|
|-|-|
|`Content-Type`|`application/x-www-form-urlencoded`|

아래를 form data로 전달한다.

|이름|값|
|-|-|
|code|콜백으로 받은 code|
|client_id|발급받은 Client ID|
|client_secret|발급받은 Client Secret|
|redirect_uri|Redirect URI|
|grant_type|무 조 건 `authorization_code`|

그러면 만약 오류가 났을 때는
```json
{
    "error": "string",
    "error_description": "string"
}
```

정상일때는
```json
{
    "id_token": "string"
}
```

이 올 것이다.

## ID Token 검증

살면서 사람 믿을 일 없다.  
Google API는 기계긴 하지만 그 사이에 요청을 채가서 변조 후 보낼 수도 있으니 id token도 검증을 해줘야한다.  

JWK 세트는 `https://www.googleapis.com/oauth2/v3/certs`에서 가져올 수 있다.  

아래와 같이 검증하면 된다.

|이름|값|
|-|-|
|issuer|`https://accounts.google.com`, `accounts.google.com`|
|audience|위에서 발급한 Client ID|

그리고 나머지는 알아서 하면 된다.

## 마치며

나중에 한 번 쯤은 읽어보지 않을까 하며 쓴다.


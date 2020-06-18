---
title: "AWS ssa 공부 # 1 - 개념 ( Global Infra ) "
date: "2020-06-16"
layout: post
draft: false
path: "/aws"
category: "aws"
tags:
  - "AWS"
  - "Infrastructure"
---

## Global Infra

- 24개의 Region(리전) 에서 출시
- 76개의 Availability Zones(가용영역) 을 가지고 있음
- Security(보안), Availability(가용성), Performance(성능), Global Footprint(국제적 입지), Scalability(확장성), Flexibility(유연성) 을 가지고 있다.

## Region(리전)

- 전 세계 도시에 분포해 있다.
- 완전히 독립적이다. 
- 강력한 내결함성과 안정성 달성한다.
- 각각의 Region은 여러개의 Availability zones 가용영역 으로 이루어져 있다.

## Availability Zone(가용 영역)

- AZ은 격리되어 있으나 한 Region 안에서는 지연시간이 짧은 링크로 연결되어 있다.
- 보통 각 Region 마다 2~3개의 AZ이 존재한다.
- AZ이 장애가 발생했을 경우 다른 AZ로 장애를 대응할 수 있다.
- Seoul Region ( 3개의 availability zone으로 구성 )

## Local Zone (로컬 영역)

- 최종 사용자에게 더 가까이 배치된 AWS infra
- AWS region 범위 밖에 있다.
- AWS Dircet Connect를 지원, 로컬 사용자에게 지연시간이 매우 짧은 통신 제공한다.
- 일부 region에서 사용 불가능하다. 


## Amazon CloudFront Global Edge Network

- 최종 사용자에게 더 짧은 지연시간으로 contents를 전송
- 42개국 82개 도시에서 Edge location - 205개, Region Edge - 11개 의 Global Network를 사용 중
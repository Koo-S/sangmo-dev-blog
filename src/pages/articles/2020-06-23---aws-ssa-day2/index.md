---
title: "AWS ssa 공부 # 2 - EC2"
date: "2020-06-23"
layout: post
draft: false
path: "/aws-2"
category: "aws"
tags:
  - "AWS"
  - "EC2"
  - "Infrastructure"
---

## Instance

- 클라우드의 가상 서버

## Instance Type

- Computing, Memory, Storage를 각각 다르게 제공
- A, M, T → 범용
- X, R, u-xtb → 메모리 최적화
- H, I → 스토리지 최적화
- G, P → 엑셀러레이티드 컴퓨팅

### Instance stopped

- 요금 부과 X, Insatnce type 변경 가능, AMI 생성 가능

### Instance terminated

- root device volume 삭제, EBS 는 삭제 안함

## Nitro System

- 우수한 성능과 고가용성, 철저한 보안을 가능하게 만든 AWS 하드웨어 및 소프트웨어 구성 요소 모음

## Instance Storage

- Instance 장애 시 데이터 손실 가능성이 있고 임시 데이터 역할이다.
- root device volume에는 ebs와 s3 방식이 있다.
- 모든 instance는 Amazon EBS 기반 또는 Instance Store 기반 중 하나에 해당된다.

## Amazon EC2 Root Device Volume

### Instance Store (S3)

- EC2 종료 혹은 장애 시 데이터 손실 O

### Amazon EBS

- EC2 종료 혹은 장애 시 데이터 손실 X

## 보안 모범 사례

1) AWS IAM Role을 이용한 Instance 엑세스 제한

2) 신뢰 가능한 port 혹은 Network만 엑세스 허용

3) 보안 그룹 정기적으로 검토 및 '최소 권한 부여' 개념 적용

4) 비밀번호를 사용한 instance 로그인 비활성화

## Instance 구입 옵션

- **Ondemand Instance** → 시작하는 instance에 대한 비용을 초 단위로 지불
- **Saving Plan** → 1년 or 3년 동안 사용 시간당 USD로 일관된 사용량을 약정
- **Reserved Instances** → 1년 or 3년 동안 일관된 instance 구성( instance type + region) 약정
- **Scheduled Instances** → 1년 동안 항상 사용 가능한 instance를 일정마다 구입 ( 지속적인 실행 X, 정기적인 실행 필요시 )
- **Spot Instances** → 미사용 EC2 Instance를 요청 ( 일괄, batch 작업 시 좋음 )
- **Dedicated Hosts** → Instance 실제 호스트비 지불, 기존의 소켓, 코어 또는 VM 소프트웨어별 라이선스를 가져와 비용을 절감
- **Dedicated Instances** → 단일 테넌트 하드웨어에서 실행되는 instance 시간 단위 지불
- **Capacity Reservations** → 원하는 기간 동안 특정 가용영역의 EC2 instance에 대해 용량을 예약
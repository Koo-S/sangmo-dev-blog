---
title: "AWS ssa 공부 # 3 - AWS Storage (EBS, EFS)"
date: "2020-07-15"
layout: post
draft: false
path: "/aws-3"
category: "aws"
tags:
  - "AWS"
  - "EC2"
  - "Storage"
  - "EBS"
---


## EBS

- EBS 볼륨은 특정 가용영역에서 생성 후 동일한 가용영역에 있는 아무 인스턴스에 연결 가능
- 가용영역 외부에 있는 인스턴스에 공유하기 위해선 스냅샷 생성 후 공유
- 스냅샷을 만들어서 S3에 저장할 수 있음 → 안정성 증가
- 

### 종류

1. 범용 SSD 볼륨 → General SSD Volume (gp2)
    - 부트 볼륨, 중소 규모 DB, 개발 환경 구성
2. 프로비저닝 IOPS 볼륨 → Provisioning IOPS Volume (io1)
    - 데이터베이스 워크로드 요구사항을 충족하도록 설계
    - Amazon EBD 다중 연결을 사용하여 여러 인스턴스에 볼륨 연결 ( **io 만 가능!!** )
3. 처리량에 최적화된 HDD 볼륨 → Through output Optimized HDD Volume (st1)
    - Amazon EMR, ETL, 데이터 웨어하우스, 로그 처리 같은 대용량 순차 워크로드에 적합
    - Cold HDD 와 비슷하지만 자주 엑세스 되는 데이터를 지원하도록 설계
4. Cold HDD 볼륨 → Cold HDD Volume (sc1)
    - 대용량 순차 콜드 데이터, 데이터 자주 엑세스 필요 X, 비용절약
5. Magnetic
    - 마그네틱 드라이브로 구성, 데이터 엑세스가 드문 워크로드에 적합

### 암호화

- 암호화된 볼륨 및 스냅샷 생성시 AWS KMS의 고객 마스터키 (CMK) 를 사용
- AES-256 알고리즘 ( 산업 표준 ) 을 통한 암호화
- EBS 암호화 기본 키 → AWS CMK를 자동으로 생성 ( alias/aws/ebs )

### 스냅샷

- EBS의 특정 시점 스냅샷을 생성하여 새 EBS 볼륨 또는 백업 기준으로 사용이 가능
- 암호화된 EBS 볼륨으로 스냅샷을 생성 시 자동으로 암호화 됨
- 루트 디바이스 역할을 하는 EBS 볼륨을 스냅샷 만들 때는 인스턴스 중지 후에 스냅샷 생성 가능

## EFS

- EC2에서 사용할 수 있는 확장 가능한 파일 스토리지 제공
- EFS를 만든 후에 여러 인스턴스에서 파일시스템을 마운트 할 수 있게 구성 가능

ex)

1. 첫번째 인스턴스

```jsx
$ sudo touch /mnt/efs/test.txt
```

2. 두번째 인스턴스

```jsx
$ ls /mnt/efs
test.txt
```
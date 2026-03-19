/**
 * Wedding Invitation Configuration
 *
 * 이 파일에서 청첩장의 모든 정보를 수정할 수 있습니다.
 * 이미지는 설정이 필요 없습니다. 아래 폴더에 순번 파일명으로 넣으면 자동 감지됩니다.
 *
 * 이미지 폴더 구조 (파일명 규칙):
 *   images/hero/1.jpg      - 메인 사진 (1장, 필수)
 *   images/story/1.jpg, 2.jpg, ...  - 스토리 사진들 (순번, 자동 감지)
 *   images/gallery/1.jpg, 2.jpg, ... - 갤러리 사진들 (순번, 자동 감지)
 *   images/location/1.jpg  - 약도/지도 이미지 (1장)
 *   images/og/1.jpg        - 카카오톡 공유 썸네일 (1장)
 */

const CONFIG = {
  // ── 초대장 열기 ──
  useCurtain: false,  // 초대장 열기 화면 사용 여부 (true: 사용, false: 바로 본문 표시)

  // ── 메인 (히어로) ──
  groom: {
    name: "이종화",
    nameEn: "Jonghwa Lee",
    father: "이찬배",
    mother: "홍순남",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "배진희",
    nameEn: "Jinhee Bae",
    father: "배석수",
    mother: "이창미",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-09-05",
    time: "12:00",
    venue: "벨리스웨딩홀",
    hall: "2층 세레나",
    address: "충북 청주시 서원구 남이면 청남로 1759",
    tel: "043-283-2000",
    mapLinks: {
      kakao: "https://kko.to/uVdI1ccj4u",
      naver: "https://naver.me/GXglHa0h"
    }
  },

  // ── 인사말 ──
  greeting: {
    title: "소중한 분들을 초대합니다",
    content: "함께 보낸 하루하루가 빠짐 없이 즐거웠다며\n앞으로의 날들도 함께 채워가려 합니다.\n\n두 사람이 가장 행복한 날,\n소중한 분들을 초대하오니 귀한 걸음 하시어\n축복해 주시면 감사하겠습니다."
  },

  // ── 우리의 이야기 ──
  story: {
    title: "",
    content: "서로의 이름을 부르는 것만으로도\n사랑의 깊이를 확인할 수 있는 두 사람이\n꽃과 나무처럼 걸어와서\n서로의 모든 것이 되기 위해\n오랜 기다림 끝에 혼례식을 치르는 날\n세상은 더욱 아름다워라\n\n이해인 - 사랑의 사람들이여 中"
  },

  // ── 오시는 길 ──
  // (mapLinks는 wedding 객체 내에 포함)

  // ── 마음 전하실 곳 ──
  accounts: {
    groom: [
      { role: "신랑", name: "이종화", bank: "국민은행", number: "000-000-000000" },
      { role: "아버지", name: "이찬배", bank: "신한은행", number: "000-000-000000" },
      { role: "어머니", name: "홍순남", bank: "우리은행", number: "000-000-000000" }
    ],
    bride: [
      { role: "신부", name: "배진희", bank: "하나은행", number: "000-000-000000" },
      { role: "아버지", name: "배석수", bank: "기업은행", number: "000-000-000000" },
      { role: "어머니", name: "이창미", bank: "농협은행", number: "000-000-000000" }
    ]
  },

  // ── 링크 공유 시 나타나는 문구 ──
  meta: {
    title: "이종화 ♥ 배진희 결혼합니다",
    description: "2026년 9월 5일, 소중한 분들을 초대합니다."
  }
};

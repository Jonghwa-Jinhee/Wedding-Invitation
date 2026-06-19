window.addEventListener('DOMContentLoaded', () => {
  // 1. 💡 최초 접속 인트로 제어
  const gifImg = document.getElementById('envelopeGif');
  if (gifImg) {
    gifImg.src = "images/intro/envelope_motion.gif?v=" + Date.now();
  }
  
  // 2. Typed.js 실행
  const typed = new Typed('#typed', {
    strings: ["We're getting married!"],
    typeSpeed: 100,    
    backSpeed: 50,     
    startDelay: 1200,  
    loop: false,       
    showCursor: false, 
    onBegin: (self) => {
      const typingTextElement = document.querySelector('.typing-text');
      if (typingTextElement) {
        typingTextElement.classList.add('is-visible');
      }
    }
  });

  // 3. 디데이 연산 함수
  function calculateDDay() {
    const ddayTarget = document.getElementById('ddayCount');
    if (!ddayTarget) return;
    const weddingDate = new Date(2026, 8, 5);
    const today = new Date();
    const todayPure = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = weddingDate.getTime() - todayPure.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) ddayTarget.textContent = `D-${diffDays}`;
    else if (diffDays === 0) ddayTarget.textContent = "Today";
    else ddayTarget.textContent = `+${Math.abs(diffDays)}`;
  }
  calculateDDay();

  // 4. 슬라이더/모달 제어
  const wrapper = document.querySelector('.gallery-slider-wrapper');
  if (wrapper) { /* 생략(기존 코드 유지) */ }

  // 5. [중요] Baby 섹션 애니메이션 통합 관리
  const babySection = document.getElementById('baby');
  if (babySection) {
    const coupleContainer = babySection.querySelector('.couple-container');
    const jonghwaTxt = babySection.querySelector('.jonghwa-txt');
    const jinheeTxt = babySection.querySelector('.jinhee-txt');

    // GIF 경로 저장
    const jonghwaSrc = jonghwaTxt.src;
    const jinheeSrc = jinheeTxt.src;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 1. 그룹 애니메이션 시작
          coupleContainer.classList.add('animate');

          // 2. Jonghwa 텍스트: 1.0초 뒤 노출 및 재생
          setTimeout(() => {
            jonghwaTxt.style.opacity = '1';
            jonghwaTxt.src = jonghwaSrc + '?v=' + Date.now();
          }, 1000);

          // 3. Jinhee 텍스트: Jonghwa 노출(1.0s) + GIF 재생시간(1.8s) = 총 2.8초 뒤 노출
          setTimeout(() => {
            jinheeTxt.style.opacity = '1';
            jinheeTxt.src = jinheeSrc + '?v=' + Date.now();
          }, 2800);

          // 관찰 중단
          observer.unobserve(babySection);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(babySection);
  }
});

// [기타 함수들]
function toggleAccordion(headerElement) { /* 기존 코드 유지 */ }
function copyAccount(accountNumber) { /* 기존 코드 유지 */ }

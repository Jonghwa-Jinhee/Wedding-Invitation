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
  if (wrapper) { /* 기존 코드 유지 */ }

  // 5. [중요] Baby 섹션 애니메이션 통합 관리
  const babySection = document.getElementById('baby');
  if (babySection) {
    const coupleContainer = babySection.querySelector('.couple-container');
    const jonghwaTxt = babySection.querySelector('.jonghwa-txt');
    const jinheeTxt = babySection.querySelector('.jinhee-txt');

    const jonghwaSrc = jonghwaTxt.src;
    const jinheeSrc = jinheeTxt.src;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          coupleContainer.classList.add('animate');

          setTimeout(() => {
            jonghwaTxt.style.opacity = '1';
            jonghwaTxt.src = jonghwaSrc + '?v=' + Date.now();
          }, 1500);

          setTimeout(() => {
            jinheeTxt.style.opacity = '1';
            jinheeTxt.src = jinheeSrc + '?v=' + Date.now();
          }, 3300);

          observer.unobserve(babySection);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(babySection);
  }

  // 6. [추가] 인트로-베이비 섹션 스크롤 제어 (웹/모바일 공용)
  let isScrolling = false;

  // 웹(휠) 이벤트
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    const intro = document.getElementById('intro');
    const baby = document.getElementById('baby');
    if (!intro || !baby) return;

    const scrollY = window.scrollY;
    const introHeight = intro.offsetHeight;

    if (e.deltaY > 0 && scrollY < introHeight) {
      e.preventDefault();
      isScrolling = true;
      window.scrollTo({ top: baby.offsetTop, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 800);
    } else if (e.deltaY < 0 && scrollY > 0 && scrollY < introHeight) {
      e.preventDefault();
      isScrolling = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 800);
    }
  }, { passive: false });

  // 모바일(터치) 이벤트
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    const intro = document.getElementById('intro');
    const baby = document.getElementById('baby');
    if (!intro || !baby) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    const scrollY = window.scrollY;
    const introHeight = intro.offsetHeight;

    if (diff > 50 && scrollY < introHeight) {
      isScrolling = true;
      window.scrollTo({ top: baby.offsetTop, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 800);
    } else if (diff < -50 && scrollY > 0 && scrollY < introHeight) {
      isScrolling = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 800);
    }
  }, { passive: false });
});

// [기타 함수들]
function toggleAccordion(headerElement) { /* 기존 코드 유지 */ }
function copyAccount(accountNumber) { /* 기존 코드 유지 */ }

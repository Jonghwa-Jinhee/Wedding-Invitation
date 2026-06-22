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

  // 4. [중요] 갤러리 모달 및 스와이프 기능
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalTargetImg');
  const modalClose = document.querySelector('.modal-close');
  
  // 갤러리 이미지 목록 추출 (모든 이미지 대상)
  const galleryImages = Array.from(document.querySelectorAll('.img-box img, .slide-item img'));
  let currentIndex = 0;

  // 모달 열기 함수
  const openModal = (index) => {
    currentIndex = index;
    modalImg.src = galleryImages[currentIndex].src;
    modal.style.display = 'flex';
  };

  // 이미지 클릭 시 모달 오픈
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

  // 닫기
  if (modalClose) modalClose.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  // 스와이프 로직
  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) { // 50px 이상 이동 시 스와이프 감지
      if (diff > 0) { // 왼쪽으로 스와이프 -> 다음 사진
        currentIndex = (currentIndex + 1) % galleryImages.length;
      } else { // 오른쪽으로 스와이프 -> 이전 사진
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      }
      modalImg.src = galleryImages[currentIndex].src;
    }
  }, { passive: true });

  // 5. Baby 섹션 애니메이션 관리
  const babySection = document.getElementById('baby');
  if (babySection) {
    const coupleContainer = babySection.querySelector('.couple-container');
    const jonghwaTxt = babySection.querySelector('.jonghwa-txt');
    const jinheeTxt = babySection.querySelector('.jinhee-txt');

    const jonghwaSrc = jonghwaTxt ? jonghwaTxt.src : '';
    const jinheeSrc = jinheeTxt ? jinheeTxt.src : '';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          coupleContainer.classList.add('animate');
          setTimeout(() => {
            if (jonghwaTxt) { jonghwaTxt.style.opacity = '1'; jonghwaTxt.src = jonghwaSrc + '?v=' + Date.now(); }
          }, 1500);
          setTimeout(() => {
            if (jinheeTxt) { jinheeTxt.style.opacity = '1'; jinheeTxt.src = jinheeSrc + '?v=' + Date.now(); }
          }, 3300);
          observer.unobserve(babySection);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(babySection);
  }

  // 6. 스크롤 제어 로직 (기존 유지)
  let isScrolling = false;
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
});

// [공통 기능 함수]
function toggleAccordion(headerElement) {
  const card = headerElement.parentElement;
  const content = headerElement.nextElementSibling;
  if (card.classList.contains('is-active')) {
    card.classList.remove('is-active');
    content.style.maxHeight = null;
  } else {
    card.classList.add('is-active');
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function copyAccount(text, message = "복사되었습니다.") {
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById('toastMessage');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => { toast.classList.remove('show'); }, 2000);
    }
  });
}

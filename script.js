window.addEventListener('DOMContentLoaded', () => {
  // 1. 💡 최초 접속(새로고침) 시에만 딱 1번 실행되고, 스크롤해도 그대로 멈춰있는 인트로 제어
  const gifImg = document.getElementById('envelopeGif');
  if (gifImg) {
    // 처음 들어왔을 때만 캐시를 깨고 1회 깔끔하게 재생 시작
    gifImg.src = "images/intro/envelope_motion.gif?v=" + Date.now();
  }
  
  // 2. Typed.js 실행 코드
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

  // 3. 디데이(D-Day) 연동 연산 함수
  function calculateDDay() {
    const ddayTarget = document.getElementById('ddayCount');
    if (!ddayTarget) return;

    const weddingDate = new Date(2026, 8, 5); // 2026년 9월 5일
    const today = new Date();
    const todayPure = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const diffTime = weddingDate.getTime() - todayPure.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      ddayTarget.textContent = `D-${diffDays}`;
    } else if (diffDays === 0) {
      ddayTarget.textContent = "Today";
    } else {
      ddayTarget.textContent = `+${Math.abs(diffDays)}`;
    }
  }

  calculateDDay();


  // 4. 하단 갤러리 미니 슬라이더 스와이프 제어
  const slider = document.getElementById('gallerySlider');
  const wrapper = document.querySelector('.gallery-slider-wrapper');
  
  if (slider && wrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - wrapper.offsetLeft;
      scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => { isDown = false; });
    wrapper.addEventListener('mouseup', () => { isDown = false; });

    wrapper.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 1.5; 
      wrapper.scrollLeft = scrollLeft - walk;
    });
  }


  // 5. 이미지 확대 모달 + 좌우 스와이프 및 앞뒤 전환 시스템
  function initGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalTargetImg');
    const closeBtn = document.querySelector('.modal-close');
    
    if (!modal || !modalImg) return;

    // 비정형 그리드 이미지와 하단 폴라로이드 이미지 전체를 순서대로 배열화
    const targetImages = Array.from(document.querySelectorAll('.img-box img, .slide-item img'));
    let currentIndex = 0;

    // 터치 스와이프 감지용 변수
    let touchStartX = 0;
    let touchEndX = 0;

    // 모달 이미지 업데이트 함수
    function updateModalImage(index) {
      if (index < 0 || index >= targetImages.length) return;
      currentIndex = index;
      modalImg.src = targetImages[currentIndex].src;
    }

    // 다음 이미지로 넘기기
    function nextImage() {
      if (currentIndex < targetImages.length - 1) {
        updateModalImage(currentIndex + 1);
      } else {
        updateModalImage(0); 
      }
    }

    // 이전 이미지로 넘기기
    function prevImage() {
      if (currentIndex > 0) {
        updateModalImage(currentIndex - 1);
      } else {
        updateModalImage(targetImages.length - 1); 
      }
    }

    // 사진 클릭 시 모달 열기 이벤트 바인딩
    targetImages.forEach((img, index) => {
      img.parentElement.addEventListener('click', (e) => {
        e.stopPropagation(); 
        modal.style.display = 'flex'; 
        updateModalImage(index);
        document.body.style.overflow = 'hidden'; 
      });
    });

    // 스와이프 감지 로직
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
      const swipeThreshold = 50; 
      if (touchStartX - touchEndX > swipeThreshold) {
        nextImage(); 
      } else if (touchEndX - touchStartX > swipeThreshold) {
        prevImage(); 
      }
    }

    // PC 키보드 방향키 제어
    window.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModalProcessing();
      }
    });

    // 모달 닫기 제어
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModalProcessing);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === closeBtn) {
        closeModalProcessing();
      }
    });

    function closeModalProcessing() {
      modal.style.display = 'none';
      document.body.style.overflow = ''; 
    }
  }

  initGalleryModal();
});

// 1. 마음 전하실 곳 아코디언 드랍다운 제어 (클릭 시 높이를 계산하여 부드럽게 유지됨)
function toggleAccordion(headerElement) {
  const card = headerElement.parentElement;
  const content = headerElement.nextElementSibling;
  
  // 이미 열려있으면 닫기
  if (card.classList.contains('is-active')) {
    card.classList.remove('is-active');
    content.style.maxHeight = null;
  } else {
    // 열려있지 않으면 열기 (max-height를 내부 스크롤 높이만큼 동적 지정하여 애니메이션 구현)
    card.classList.add('is-active');
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

// 2. 계좌번호 클립보드 복사 및 토스트 팝업 알림 시스템
function copyAccount(accountNumber) {
  // 클립보드 복사 실행
  navigator.clipboard.writeText(accountNumber).then(() => {
    const toast = document.getElementById('toastMessage');
    if (!toast) return;

    // 이미 토스트가 떠 있다면 중복 제거용으로 클래스 한 번 초기화
    toast.classList.remove('show');
    
    // 강제 리플로우를 발생시켜 애니메이션 초기화 후 다시 띄우기
    void toast.offsetWidth; 
    
    toast.classList.add('show');

    // 2초 뒤에 서서히 사라지게 설정
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }).catch(err => {
    console.error('복사에 실패했습니다.', err);
  });
}
// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "tw-elements"

// Carrossel
import {
  Carousel,
  initTWE,
} from "tw-elements";

initTWE({ Carousel });

var swiper = new Swiper(".progress-slide-carousel", {
  loop: true,
  fraction: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: true,
  },
  pagination: {
    el: ".progress-slide-carousel .swiper-pagination",
    type: "progressbar",
  },
  });
//--------------------------------------------------------

// Dark Mode
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

var themeToggleBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggleLightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    themeToggleDarkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

//--------------------------------------------------------


// Carrosel equipe
const testimonials = document.querySelectorAll('.testimonial');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.9 });

testimonials.forEach(testimonial => {
  observer.observe(testimonial);
});

//--------------------------------------------------------


//Carrosel clientes
document.addEventListener('alpine:init', () => {
  Alpine.data('slider', () => ({
    active: 0,
    autorotate: true,
    autorotateTiming: 7000,
    testimonials: [
      {
        img: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp',
        quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
        name: 'Jessie J',
        role: 'Acme LTD'
      },
      {
        img: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp',
        quote: "Having the power to capture user feedback is revolutionary. Even if a participant abandons the sign-up process midway, their valuable input remains intact.",
        name: 'Nick V',
        role: 'Malika Inc.'
      },
      {
        img: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp',
        quote: "The functionality to capture responses is a true game-changer. Even if a user becomes fatigued during sign-up and abandons the process, their information remains stored.",
        name: 'Amelia W',
        role: 'Panda AI'
      },
    ],
    init() {
      if (this.autorotate) {
        this.autorotateInterval = setInterval(() => {
          this.active = this.active + 1 === this.testimonials.length ? 0 : this.active + 1
        }, this.autorotateTiming)
      }
      this.$watch('active', callback => this.heightFix())
    },
    stopAutorotate() {
      clearInterval(this.autorotateInterval)
      this.autorotateInterval = null
    },
    heightFix() {
      this.$nextTick(() => {
        this.$refs.testimonials.style.height = this.$refs.testimonials.children[this.active + 1].offsetHeight + 'px'
      })
    }
  }))
})
//--------------------------------------------------------

// Autoplay do slide
document.addEventListener('alpine:init', () => {
  Alpine.data('carousel', (carouselData = {
      slides: [],
  }) => ({
      slides: carouselData.slides,
      currentSlideIndex: 1,
      interval: null, // Para armazenar o ID do intervalo
      
      init() {
          // Configura o autoplay
          this.startAutoplay();
      },
      
      previous() {
          if (this.currentSlideIndex > 1) {
              this.currentSlideIndex--;
          } else {
              this.currentSlideIndex = this.slides.length;
          }
      },
      
      next() {
          if (this.currentSlideIndex < this.slides.length) {
              this.currentSlideIndex++;
          } else {
              this.currentSlideIndex = 1;
          }
      },
      
      startAutoplay() {
          this.interval = setInterval(() => {
              this.next();
          }, 3000); // Troca de slide a cada 3 segundos
      },
      
      stopAutoplay() {
          clearInterval(this.interval);
      },
  }));
});

//--------------------------------------------------------

// Carrossel de cards de serviços
document.addEventListener('alpine:init', () => {
  Alpine.data('carousel_bluer', () => ({
    cards: [
      {
        avatar: 'https://tailwindcss.com/img/jonathan.jpg',
        title: 'How to be effective at working remotely?',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        image: 'https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        category: 'ARTICLE',
        tag: 'PROCESS',
      },
      {
        avatar: 'https://tailwindcss.com/img/jonathan.jpg',
        title: 'How to manage your time effectively?',
        description: 'Time management is an essential skill for personal and professional growth.',
        image: 'https://images.pexels.com/photos/3184304/pexels-photo-3184304.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        category: 'GUIDE',
        tag: 'TIME',
      },
      {
        avatar: 'https://tailwindcss.com/img/jonathan.jpg',
        title: 'How to improve your team communication?',
        description: 'Effective communication is key to team success and collaboration.',
        image: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        category: 'TIP',
        tag: 'COMMUNICATION',
      },
    ],
    currentCard: 0,
    autoplayInterval: null,
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextCard();
      }, 3000);
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    },
    nextCard() {
      this.currentCard = (this.currentCard + 1) % this.cards.length;
    },
    setCard(index) {
      this.currentCard = index; // Atualiza o card ativo
    },
    init() {
      this.startAutoplay();
    },
  }));
});
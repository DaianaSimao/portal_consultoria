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
// Seleção dos elementos
var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
var themeToggleBtn = document.getElementById('theme-toggle');

// Inicialização do tema
function initializeTheme() {
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('color-theme');

  if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
    document.documentElement.classList.add('dark');
    themeToggleDarkIcon.classList.add('hidden');
    themeToggleLightIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleLightIcon.classList.add('hidden');
  }
}

// Alternância do tema
function toggleTheme() {
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  }
}

// Inicialização ao carregar a página
initializeTheme();

// Evento de clique no botão
themeToggleBtn.addEventListener('click', toggleTheme);
//--------------------------------------------------------


// Carrosel equipe
const testimonials = document.querySelectorAll('.testimonial');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); // Aplica a classe quando visível
    } else {
      entry.target.classList.remove('show'); // Remove a classe se sair do viewport
    }
  });
}, { 
  threshold: 0.1, // Detecta quando 10% do elemento está visível
  rootMargin: '0px 0px -50px 0px' // Antecipação na detecção
});

// Observa todos os elementos
testimonials.forEach(testimonial => {
  observer.observe(testimonial);
});

// Verifica se os elementos já estão visíveis (útil para links internos)
window.addEventListener('load', () => {
  testimonials.forEach(testimonial => {
    if (testimonial.getBoundingClientRect().top < window.innerHeight) {
      testimonial.classList.add('show');
    }
  });
});

//--------------------------------------------------------


//Carrosel clientes
document.addEventListener('alpine:init', () => {
  Alpine.data('slider', () => ({
    active: 0,
    autorotate: true,
    autorotateTiming: 5000,
    testimonials: [
      {
        img: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp',
        quote: "A equipe da Upgrade Tech transformou completamente nossa infraestrutura de TI. Hoje, temos sistemas mais rápidos, seguros e adaptados ao crescimento da empresa.",
        name: 'Jessie J',
        role: 'Product Onwer, Acme LTD'
      },
      {
        img: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp',
        quote: "A consultoria foi um divisor de águas para o nosso negócio. A expertise da equipe garantiu soluções eficientes e um suporte de primeira.",
        name: 'Nick V',
        role: 'CEO, Malika Inc.'
      },
      {
        img: 'https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(3).webp',
        quote: "Graças ao trabalho da Upgrade Tech, reduzimos custos operacionais e aumentamos nossa produtividade. A parceria superou todas as expectativas!",
        name: 'Amelia W',
        role: 'CEO, Panda AI'
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
        avatar: 'https://www.alefsi.com/wp-content/uploads/2018/07/consultoria-TI.jpg',
        title: 'Entendimento e Planejamento',
        description: 'Na Upgrade Tech, o primeiro passo é compreender as necessidades e objetivos do seu negócio. \
                      Realizamos um levantamento detalhado para identificar desafios e oportunidades, garantindo que \
                      o software seja alinhado à sua estratégia e entregue com alta qualidade.',
        image: 'https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        avatar: 'https://www.alefsi.com/wp-content/uploads/2018/07/consultoria-TI.jpg',
        title: ' Desenvolvimento Personalizado',
        description: 'Nossa equipe de desenvolvedores trabalha em estreita colaboração \
                      com você para criar soluções sob medida. Utilizamos tecnologias modernas, \
                      metodologias ágeis e boas práticas de mercado para garantir um desenvolvimento \
                      eficiente, escalável e dentro do prazo.',
        image: 'https://images.pexels.com/photos/3184304/pexels-photo-3184304.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        avatar: 'https://www.alefsi.com/wp-content/uploads/2018/07/consultoria-TI.jpg',
        title: 'Entrega e Suporte Contínuo',
        description: 'Além de entregar um software robusto e funcional, oferecemos suporte \
                      contínuo para garantir que o sistema atenda às suas expectativas no dia \
                      a dia. Estamos prontos para realizar melhorias e adaptações conforme o \
                      crescimento do seu negócio.',
        image: 'https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
    ],
    currentCard: 0,
    autoplayInterval: null,
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextCard();
      }, 2000);
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth', 
      block: 'start',
    });

    // Forçar Alpine.js a reavaliar após a navegação
    setTimeout(() => {
      document.dispatchEvent(new Event('alpine:init'));
    }, 500); // Tempo suficiente para o scroll suave concluir
  });
});

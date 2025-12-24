// 主JavaScript文件 - 内黄县果树协会官网
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 轮播图功能
    class ImageSlider {
        constructor() {
            this.sliderTrack = document.querySelector('.slider-track');
            this.slides = document.querySelectorAll('.slide');
            this.indicators = document.querySelectorAll('.indicator');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            
            this.currentSlide = 0;
            this.slideCount = this.slides.length;
            this.autoPlayInterval = null;
            this.autoPlayDelay = 5000; // 5秒自动轮播
            
            this.init();
        }
        
        init() {
            // 绑定事件
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // 指示器点击事件
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // 键盘导航
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });
            
            // 触摸滑动支持
            this.addTouchSupport();
            
            // 开始自动播放
            this.startAutoPlay();
            
            // 鼠标悬停时暂停自动播放
            this.sliderTrack.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.sliderTrack.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        goToSlide(index) {
            this.currentSlide = index;
            this.updateSlider();
        }
        
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slideCount;
            this.updateSlider();
        }
        
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
            this.updateSlider();
        }
        
        updateSlider() {
            // 更新滑块位置
            this.sliderTrack.style.transform = `translateX(-${this.currentSlide * 33.333}%)`;
            
            // 更新活动状态
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentSlide);
            });
            
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });
        }
        
        addTouchSupport() {
            let startX = 0;
            let endX = 0;
            
            this.sliderTrack.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.sliderTrack.addEventListener('touchmove', (e) => {
                endX = e.touches[0].clientX;
            });
            
            this.sliderTrack.addEventListener('touchend', () => {
                const diff = startX - endX;
                const threshold = 50; // 滑动阈值
                
                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        this.nextSlide(); // 向左滑动
                    } else {
                        this.prevSlide(); // 向右滑动
                    }
                }
            });
        }
        
        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        }
        
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
    }
    
    // 初始化轮播图
    if (document.querySelector('.slider-container')) {
        new ImageSlider();
    }

    // 图片懒加载实现
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src') || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        // 添加data-src属性用于懒加载
        if (!img.hasAttribute('data-src')) {
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        }
        imageObserver.observe(img);
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        // 添加背景色
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // 平滑滚动锚点链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 移动端点击后关闭菜单
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // 滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.news-card, .service-item, .stat-item, .variety-card, .tech-item, .tech-featured');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 技术分享页面的交互效果
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            // 这里可以添加点击后的跳转逻辑
            const title = this.querySelector('h4').textContent;
            console.log('点击了技术文章:', title);
        });
    });

    // 品种卡片悬停效果
    const varietyCards = document.querySelectorAll('.variety-card');
    varietyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // 性能监控和错误追踪
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
        // 这里可以集成错误上报服务
    });

    // 服务Worker注册（如果支持）
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker 注册成功: ', registration.scope);
                })
                .catch(function(error) {
                    console.log('ServiceWorker 注册失败: ', error);
                });
        });
    }

    // 统计代码（示例，需要替换为实际统计代码）
    function trackPageView() {
        // 这里可以集成百度统计、Google Analytics等
        console.log('页面访问统计:', window.location.pathname);
    }

    // 初始化统计
    trackPageView();
    document.getElementById('year').innerText=new Date().getFullYear();
});
function bannerLink(url){
    window.location.href=url;
}
function linkToTec(id){
    window.location.href=`/a/tech-detail.html?id=${id}`;
}
// 工具函数
const Utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 格式化日期
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('zh-CN');
    }
};

// SEO优化相关功能
const SEOHelper = {
    // 设置结构化数据
    setStructuredData: function() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "内黄县果树协会",
            "url": "https://nhxgsxh.com",
            "logo": "https://nhxgsxh.com/images/logo.png",
            "description": "内黄县果树协会 - 专业果树种植技术推广、科普示范、农业技术服务",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "内黄县",
                "addressRegion": "河南省",
                "addressCountry": "CN"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+86-372-1234567",
                "contactType": "customer service"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    },

    // 设置规范链接
    setCanonicalLink: function() {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = window.location.href.split('?')[0]; // 移除参数
        document.head.appendChild(link);
    }
};

// 页面加载完成后初始化SEO功能
window.addEventListener('load', function() {
    SEOHelper.setStructuredData();
    SEOHelper.setCanonicalLink();
});

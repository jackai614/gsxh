// 关于我们页面专用JavaScript
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').innerText=new Date().getFullYear();
    // 移动端菜单切换（与主页保持一致）
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 图片懒加载实现
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    img.src = dataSrc;
                    img.classList.add('loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        if (!img.hasAttribute('data-src')) {
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        }
        imageObserver.observe(img);
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

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

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // 时间轴动画效果
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // 组织架构卡片悬停效果
    const structureItems = document.querySelectorAll('.structure-item');
    structureItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.boxShadow = 'var(--shadow)';
            this.style.transform = 'translateY(0)';
        });
    });

    // 荣誉卡片交互效果
    const honorCards = document.querySelectorAll('.honor-card');
    honorCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 服务项目点击效果
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function () {
            // 这里可以添加点击后的详细展开效果
            this.classList.toggle('active');
        });
    });

    // 加入我们按钮点击事件
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // 这里可以添加会员申请流程
            window.location.href = this.getAttribute('href');
        });
    }

    // 面包屑导航高亮当前页面
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '/a/'+currentPage ||
            (currentPage === 'about.html' && link.getAttribute('href') === '/a/about.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 页面访问统计
    function trackPageView() {
        // 这里可以集成百度统计、Google Analytics等
        const pageTitle = document.title;
        const pageUrl = window.location.href;
        console.log('页面访问:', pageTitle, pageUrl);

        // 发送统计数据的示例
        // gtag('config', 'GA_MEASUREMENT_ID', {
        //     page_title: pageTitle,
        //     page_location: pageUrl
        // });
    }

    // 初始化统计
    trackPageView();

    // 错误监控
    window.addEventListener('error', function (e) {
        console.error('页面错误:', e.error);
        // 这里可以集成错误上报服务
    });

    // 性能监控
    window.addEventListener('load', function () {
        // 页面加载性能监控
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('页面加载时间:', loadTime + 'ms');

        // 核心网页指标监控
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                });
            });

            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    });
});

// SEO优化功能
const AboutPageSEO = {
    // 设置页面结构化数据
    setPageStructuredData: function () {
        const pageStructuredData = {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "关于内黄县果树协会",
            "description": "内黄县果树协会成立于2005年，是经内黄县农业局批准成立的公益性农业技术推广组织",
            "url": "http://www.nhxgsxh.com/a/guanyuwomen/",
            "mainEntity": {
                "@type": "Organization",
                "name": "内黄县果树协会",
                "foundingDate": "2005",
                "numberOfEmployees": {
                    "@type": "QuantitativeValue",
                    "value": "50"
                }
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(pageStructuredData);
        document.head.appendChild(script);
    },

    // 设置面包屑结构化数据
    setBreadcrumbStructuredData: function () {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "首页",
                    "item": "http://www.nhxgsxh.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "关于协会",
                    "item": "http://www.nhxgsxh.com/a/guanyuwomen/"
                }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbData);
        document.head.appendChild(script);
    },

    // 设置规范链接
    setCanonicalLink: function () {
        let canonicalUrl = window.location.href.split('?')[0]; // 移除参数

        // 确保URL以斜杠结尾
        if (!canonicalUrl.endsWith('/')) {
            canonicalUrl += '/';
        }

        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalUrl;
        document.head.appendChild(link);
    }
};

// 页面加载完成后初始化SEO功能
window.addEventListener('load', function () {
    AboutPageSEO.setPageStructuredData();
    AboutPageSEO.setBreadcrumbStructuredData();
    AboutPageSEO.setCanonicalLink();
});

// 工具函数
const AboutPageUtils = {
    // 格式化数字（千分位）
    formatNumber: function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // 防抖函数
    debounce: function (func, wait) {
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
    throttle: function (func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};
// 百度seo api提交
function seoToBaidu() {
    // 要提交的网址，每行一个
    const urlList = `http://www.nhxgsxh.com/index.html
http://www.nhxgsxh.com/a/about.html
http://www.nhxgsxh.com/a/contact.html
http://www.nhxgsxh.com/a/products.html
http://www.nhxgsxh.com/a/product-detail.html?name=抗重茬桃苗
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠9号
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠7号
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠13号
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠8号
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠10号
http://www.nhxgsxh.com/a/product-detail.html?name=中油珠玉
http://www.nhxgsxh.com/a/product-detail.html?name=兴农红2号
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠11号
http://www.nhxgsxh.com/a/product-detail.html?name=中油蟠桃5号
http://www.nhxgsxh.com/a/product-detail.html?name=中桃颜玉4号
http://www.nhxgsxh.com/a/product-detail.html?name=锦绣黄桃
http://www.nhxgsxh.com/a/product-detail.html?name=中油金铭
http://www.nhxgsxh.com/a/product-detail.html?name=春美
http://www.nhxgsxh.com/a/technology.html
http://www.nhxgsxh.com/a/tech-detail.html?id=114796

`;

    // 您的令牌和站点，从请求URL中提取
    const site = 'www.nhxgsxh.com';
    const token = 'Mwgq2QXfH1NFuxZZ';
    const apiUrl = `http://data.zz.baidu.com/urls?site=${site}&token=${token}`;

    // 发送 POST 请求
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain', // 关键：设置为纯文本
            'User-Agent': 'curl/7.12.1' // 通常可省略，或设置为自定义标识
        },
        body: urlList // 直接发送文本
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); // 或 response.json()，根据服务器返回格式决定
        })
        .then(data => {
            console.log('提交成功！服务器响应:', data);
        })
        .catch(error => {
            console.error('提交出错:', error);
        });
}
seoToBaidu();
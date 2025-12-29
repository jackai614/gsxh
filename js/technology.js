// 种植技术页面专用JavaScript
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').innerText = new Date().getFullYear();
    //截取学习文章中的图片路径方法
    function extractImageSrcs(htmlString) {
        const imgSrcRegex = /<img[^>]*src=(['"])?([^'"]+)\1[^>]*>/g;
        const srcs = [];

        let match;
        while ((match = imgSrcRegex.exec(htmlString))) {
            srcs.push(match[2]);
        }

        return srcs;
    }
    function dateStr(date) {
        let newDate = new Date(date);
        let month = newDate.getMonth() + 1 < 10 ? '0' + Number(newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let day = newDate.getDate() < 10 ? '0' + Number(newDate.getDate()) : newDate.getDate();
        return newDate.getFullYear() + "-" + month + "-" + day;
    }
    let allData = [];
    function page() {
        var categoryObj = { "栽培技术": "irrigation", "修剪整形": "pruning", "病虫害防治": "pest", "水肥管理": "fertilizer" };
        var str = '';
        allData.forEach((item) => {
            let keywords = item.keyword || '';
            let imgsrc = '';
            let tagStr = ''
            if (keywords && keywords.length) {
                keywords.split(',').forEach((tagItem) => {
                    tagStr = tagStr + `<span class="tag">#${tagItem}</span>`
                })
            }
            if (extractImageSrcs(item.content) && extractImageSrcs(item.content).length) {
                imgsrc = extractImageSrcs(item.content)[0].split('/');
                imgsrc = imgsrc[imgsrc.length - 1];
                imgsrc = `/images/study_images/${imgsrc}`
            }
            str = str + `
            <article class="tech-article" data-category="${keywords.includes('虫') || keywords.includes('防治') ? categoryObj['病虫害防治'] : keywords.includes('水肥') ? categoryObj['水肥管理'] : keywords.includes('修剪') ? categoryObj['修剪整形'] : keywords.includes('栽培') || keywords.includes('管理') ? categoryObj['栽培技术'] : 'all'}" data-popularity="1258">
                <div class="article-image">
                    <img data-src="${imgsrc}" alt="${item.title}"
                onerror="this.src = '${extractImageSrcs(item.content).length ? imgsrc : 'https://img0.baidu.com/it/u=637550358,3618406664&fm=253&fmt=auto&app=120&f=JPEG'}'" loading="lazy" width="300" height="200">
                </div>
                <div class="article-content">
                    <h3><a href="/a/tech-detail.html?id=${item.id}">${item.title}</a></h3>
                    <p class="article-meta">
                        <span class="date">📅 ${dateStr(item.updateTime)}</span>
                    </p>
                    <p class="article-excerpt"> ${item.description.substr(0, 95)}...</p>
                    <div class="article-tags">
                        ${tagStr}
                    </div>
                </div>
            </article>
        `
        })
        document.getElementById('techArticles').innerHTML = str;
    }
    let isUpdateData = 1;
    if (localStorage.getItem('study') && localStorage.getItem('isUpdateData') && localStorage.getItem('isUpdateData') == isUpdateData) {
        let study = JSON.parse(localStorage.getItem('study'));
        allData = Object.assign([], study);
        page();
        loadingOverlay.style.display = 'none';//隐藏loading
    } else {
        var script = document.createElement('script');
        script.src = '/js/study.js';
        // 将script标签添加到页面的head或body中
        document.head.appendChild(script);
        script.onload = function () {
            study = study.sort((a, b) => b.updateTime - a.updateTime);
            allData = Object.assign([], study);
            page();
            loadingOverlay.style.display = 'none';//隐藏loading
            localStorage.setItem('study', JSON.stringify(allData));
            localStorage.setItem('isUpdateData', isUpdateData);
            location.reload();
        }
    }

    // 技术分类筛选功能
    const categoryBtns = document.querySelectorAll('.category-btn, .category-link');
    const techArticles = document.querySelectorAll('.tech-article');
    const totalResults = document.getElementById('totalResults');

    // 分类筛选功能
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const category = this.getAttribute('data-category');

            // 更新活动状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选文章
            let visibleCount = 0;
            techArticles.forEach(article => {
                if (category === 'all' || article.getAttribute('data-category') === category) {
                    article.style.display = 'flex';
                    visibleCount++;
                } else {
                    article.style.display = 'none';
                }
            });

            // 更新结果计数
            if (totalResults) {
                totalResults.textContent = visibleCount;
            }
        });
    });

    // 搜索功能
    const searchInput = document.getElementById('techSearch');
    const searchBtn = document.querySelector('.search-btn');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            // 显示所有文章
            techArticles.forEach(article => {
                article.style.display = 'flex';
            });
            if (totalResults) {
                totalResults.textContent = techArticles.length;
            }
            return;
        }

        let foundCount = 0;
        techArticles.forEach(article => {
            const title = article.querySelector('h3 a').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const tags = article.querySelector('.article-tags').textContent.toLowerCase();

            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
                article.style.display = 'flex';
                foundCount++;

                // 高亮搜索关键词
                highlightSearchTerm(article, searchTerm);
            } else {
                article.style.display = 'none';
            }
        });

        if (totalResults) {
            totalResults.textContent = foundCount;
        }
    }

    function highlightSearchTerm(element, term) {
        const textElements = element.querySelectorAll('h3 a, .article-excerpt, .article-tags');
        textElements.forEach(textElement => {
            const originalHTML = textElement.innerHTML;
            const regex = new RegExp(`(${term})`, 'gi');
            const highlightedHTML = originalHTML.replace(regex, '<mark>$1</mark>');
            textElement.innerHTML = highlightedHTML;
        });
    }

    // 搜索事件监听
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 防抖搜索
        searchInput.addEventListener('input', debounce(function (e) {
            if (e.target.value.trim() === '') {
                performSearch();
            }
        }, 300));
    }

    // 排序功能
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortBy = this.value;
            sortArticles(sortBy);
        });
    }

    function sortArticles(sortBy) {
        const articlesContainer = document.getElementById('techArticles');
        const articlesArray = Array.from(techArticles);

        articlesArray.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    const dateA = new Date(a.querySelector('.date').textContent.replace('📅 ', ''));
                    const dateB = new Date(b.querySelector('.date').textContent.replace('📅 ', ''));
                    return dateB - dateA;

                case 'popular':
                    const popularityA = parseInt(a.getAttribute('data-popularity'));
                    const popularityB = parseInt(b.getAttribute('data-popularity'));
                    return popularityB - popularityA;

                case 'hot':
                    // 综合排序（阅读量 + 时效性）
                    const popA = parseInt(a.getAttribute('data-popularity'));
                    const popB = parseInt(b.getAttribute('data-popularity'));
                    const dateAA = new Date(a.querySelector('.date').textContent.replace('📅 ', ''));
                    const dateBB = new Date(b.querySelector('.date').textContent.replace('📅 ', ''));
                    const timeDiff = (dateBB - dateAA) / (1000 * 60 * 60 * 24); // 天数差
                    const hotScoreA = popA / Math.max(1, timeDiff);
                    const hotScoreB = popB / Math.max(1, timeDiff);
                    return hotScoreB - hotScoreA;

                default:
                    return 0;
            }
        });

        // 重新排列文章
        articlesArray.forEach(article => {
            articlesContainer.appendChild(article);
        });
    }


    // 图片懒加载
    const techImages = document.querySelectorAll('.tech-article img, .featured-card img, .sidebar-card img');
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

    techImages.forEach(img => {
        if (!img.hasAttribute('data-src')) {
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        }
        imageObserver.observe(img);
    });

    // 阅读量模拟（实际项目中应该从后端获取）
    function simulatePageView() {
        const articles = document.querySelectorAll('.tech-article');
        articles.forEach(article => {
            const viewsElement = article.querySelector('.views');
            if (viewsElement) {
                const currentViews = parseInt(article.getAttribute('data-popularity'));
                // 每次页面访问增加随机阅读量
                const newViews = currentViews + Math.floor(Math.random() * 10);
                article.setAttribute('data-popularity', newViews);
                viewsElement.textContent = '👁️ ' + newViews.toLocaleString() + ' 阅读';
            }
        });
    }

    // 页面访问统计
    function trackTechnologyPageView() {
        const pageTitle = '种植技术页面';
        const pageUrl = window.location.href;

        console.log('技术页面访问:', pageTitle, pageUrl);
        // 这里可以集成统计代码
        // gtag('config', 'GA_MEASUREMENT_ID', { page_title: pageTitle, page_location: pageUrl });

        // 模拟增加阅读量
        setTimeout(simulatePageView, 1000);
    }

    // 工具函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 初始化页面功能
    trackTechnologyPageView();

    // 设置结构化数据
    setTechnologyStructuredData();
});

// SEO优化功能
function setTechnologyStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "种植技术 - 内黄县果树协会",
        "description": "专业果树种植技术指导，包括修剪、病虫害防治、施肥管理等全方位技术内容",
        "url": window.location.href,
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": document.querySelectorAll('.tech-article').length,
            "itemListElement": Array.from(document.querySelectorAll('.tech-article')).map((article, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Article",
                    "headline": article.querySelector('h3 a').textContent,
                    "description": article.querySelector('.article-excerpt').textContent,
                    "datePublished": article.querySelector('.date').textContent.replace('📅 ', ''),
                    "author": {
                        "@type": "Person",
                        "name": '果树协会'
                    }
                }
            }))
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// 性能优化：预加载重要图片
function preloadCriticalImages() {
    const criticalImages = [
        // 'images/tech-featured.jpg',
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// 页面加载完成后初始化
window.addEventListener('load', function () {
    preloadCriticalImages();
});
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
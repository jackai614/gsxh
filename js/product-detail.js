// 产品详情页专用JavaScript
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').innerText=new Date().getFullYear();
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 图片画廊功能
    class ProductGallery {
        constructor() {
            this.mainImage = document.getElementById('mainProductImage');
            this.thumbnailItems = document.querySelectorAll('.thumbnail-item');
            this.currentImageIndex = 0;

            this.init();
        }

        init() {
            // 绑定缩略图点击事件
            this.thumbnailItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.switchImage(index);
                });
            });

            // 键盘导航
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
            });

            // 触摸滑动支持
            this.addTouchSupport();
        }

        switchImage(index) {
            if (index >= 0 && index < this.thumbnailItems.length) {
                // 更新活动状态
                this.thumbnailItems.forEach(item => item.classList.remove('active'));
                this.thumbnailItems[index].classList.add('active');

                // 获取新图片URL
                const newImageSrc = this.thumbnailItems[index].getAttribute('data-image');

                // 添加淡出效果
                this.mainImage.style.opacity = '0';

                setTimeout(() => {
                    this.mainImage.src = newImageSrc;
                    this.mainImage.style.opacity = '1';
                }, 300);

                this.currentImageIndex = index;
            }
        }

        nextImage() {
            const nextIndex = (this.currentImageIndex + 1) % this.thumbnailItems.length;
            this.switchImage(nextIndex);
        }

        previousImage() {
            const prevIndex = (this.currentImageIndex - 1 + this.thumbnailItems.length) % this.thumbnailItems.length;
            this.switchImage(prevIndex);
        }

        addTouchSupport() {
            let startX = 0;
            let endX = 0;

            this.mainImage.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            this.mainImage.addEventListener('touchmove', (e) => {
                endX = e.touches[0].clientX;
            });

            this.mainImage.addEventListener('touchend', () => {
                const diff = startX - endX;
                const threshold = 50; // 滑动阈值

                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        this.nextImage(); // 向左滑动
                    } else {
                        this.previousImage(); // 向右滑动
                    }
                }
            });
        }
    }

    // 初始化图片画廊
    if (document.querySelector('.product-gallery')) {
        new ProductGallery();
    }

    // 选项卡功能
    class ProductTabs {
        constructor() {
            this.tabHeaders = document.querySelectorAll('.tab-header');
            this.tabContents = document.querySelectorAll('.tab-content');

            this.init();
        }

        init() {
            this.tabHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const tabId = header.getAttribute('data-tab');
                    this.switchTab(tabId);
                });
            });

            // URL哈希切换
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash.substring(1);
                if (hash) {
                    this.switchTab(hash);
                }
            });

            // 初始激活第一个选项卡
            if (window.location.hash) {
                this.switchTab(window.location.hash.substring(1));
            }
        }

        switchTab(tabId) {
            // 更新活动状态
            this.tabHeaders.forEach(header => {
                header.classList.remove('active');
                if (header.getAttribute('data-tab') === tabId) {
                    header.classList.add('active');
                }
            });

            // 显示对应内容
            this.tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId + '-tab') {
                    content.classList.add('active');

                    // 懒加载内容中的图片
                    this.lazyLoadImages(content);
                }
            });

            // 更新URL哈希
            window.history.replaceState(null, null, '#' + tabId);
        }

        lazyLoadImages(container) {
            const images = container.querySelectorAll('img[data-src]');
            images.forEach(img => {
                if (img.getAttribute('data-src') && !img.src.includes(img.getAttribute('data-src'))) {
                    img.src = img.getAttribute('data-src');
                    img.classList.add('loaded');
                }
            });
        }
    }

    // 初始化选项卡
    if (document.querySelector('.product-tabs')) {
        new ProductTabs();
    }

    // 数量选择器
    class QuantitySelector {
        constructor() {
            this.quantityInput = document.getElementById('quantity');
            this.minusBtn = document.querySelector('.quantity-btn.minus');
            this.plusBtn = document.querySelector('.quantity-btn.plus');

            this.minQuantity = parseInt(this.quantityInput.getAttribute('min')) || 1;
            this.maxQuantity = parseInt(this.quantityInput.getAttribute('max')) || 100;

            this.init();
        }

        init() {
            this.minusBtn.addEventListener('click', () => this.decrease());
            this.plusBtn.addEventListener('click', () => this.increase());

            this.quantityInput.addEventListener('input', () => this.validate());
            this.quantityInput.addEventListener('change', () => this.validate());

            this.updateButtonStates();
        }

        decrease() {
            let currentValue = parseInt(this.quantityInput.value) || this.minQuantity;
            if (currentValue > this.minQuantity) {
                this.quantityInput.value = currentValue - 1;
                this.updateButtonStates();
            }
        }

        increase() {
            let currentValue = parseInt(this.quantityInput.value) || this.minQuantity;
            if (currentValue < this.maxQuantity) {
                this.quantityInput.value = currentValue + 1;
                this.updateButtonStates();
            }
        }

        validate() {
            let value = parseInt(this.quantityInput.value) || this.minQuantity;

            if (value < this.minQuantity) {
                value = this.minQuantity;
            } else if (value > this.maxQuantity) {
                value = this.maxQuantity;
            }

            this.quantityInput.value = value;
            this.updateButtonStates();
        }

        updateButtonStates() {
            const currentValue = parseInt(this.quantityInput.value);

            this.minusBtn.disabled = currentValue <= this.minQuantity;
            this.plusBtn.disabled = currentValue >= this.maxQuantity;
        }
    }

    // 初始化数量选择器
    if (document.getElementById('quantity')) {
        new QuantitySelector();
    }

    // 购物车功能
    class ShoppingCart {
        constructor() {
            this.addToCartBtn = document.querySelector('.add-to-cart-btn');
            this.buyNowBtn = document.querySelector('.buy-now-btn');
            this.wishlistBtn = document.querySelector('.wishlist-btn');

            this.init();
        }

        init() {
            if (this.addToCartBtn) {
                this.addToCartBtn.addEventListener('click', () => this.addToCart());
            }

            if (this.buyNowBtn) {
                this.buyNowBtn.addEventListener('click', () => this.buyNow());
            }

            if (this.wishlistBtn) {
                this.wishlistBtn.addEventListener('click', () => this.toggleWishlist());
            }
        }

        addToCart() {
            const product = this.getProductInfo();
            const quantity = parseInt(document.getElementById('quantity').value);

            // 这里可以集成实际的购物车逻辑
            console.log('添加到购物车:', product, '数量:', quantity);

            this.showMessage('商品已添加到购物车');
            this.animateAddToCart();
        }

        buyNow() {
            const product = this.getProductInfo();
            const quantity = parseInt(document.getElementById('quantity').value);

            // 这里可以集成立即购买逻辑
            console.log('立即购买:', product, '数量:', quantity);

            this.showMessage('正在跳转到结算页面...');

            // 模拟跳转延迟
            setTimeout(() => {
                // window.location.href = '/checkout.html';
            }, 1000);
        }

        toggleWishlist() {
            const isActive = this.wishlistBtn.classList.contains('active');

            if (isActive) {
                this.wishlistBtn.classList.remove('active');
                this.wishlistBtn.innerHTML = '❤️ 收藏';
                this.showMessage('已从收藏夹移除');
            } else {
                this.wishlistBtn.classList.add('active');
                this.wishlistBtn.innerHTML = '❤️ 已收藏';
                this.showMessage('已添加到收藏夹');
            }
        }

        getProductInfo() {
            return {
                id: document.querySelector('.product-sku').textContent.replace('产品编号: ', ''),
                name: document.querySelector('.product-title').textContent,
                price: parseFloat(document.querySelector('.current-price').textContent.replace('¥', '')),
                image: document.getElementById('mainProductImage').src
            };
        }

        animateAddToCart() {
            const btn = this.addToCartBtn;
            const originalText = btn.textContent;

            btn.textContent = '✓ 已添加';
            btn.style.background = '#4caf50';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        }

        showMessage(message) {
            const messageEl = document.createElement('div');
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                z-index: 1000;
                box-shadow: var(--shadow);
                animation: slideIn 0.3s ease-out;
            `;

            document.body.appendChild(messageEl);

            setTimeout(() => {
                messageEl.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    document.body.removeChild(messageEl);
                }, 300);
            }, 3000);
        }
    }

    // 初始化购物车功能
    if (document.querySelector('.purchase-options')) {
        new ShoppingCart();
    }

    // 分享功能
    class ShareManager {
        constructor() {
            this.shareBtns = document.querySelectorAll('.share-btn');
            this.init();
        }

        init() {
            this.shareBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const type = btn.className.replace('share-btn ', '');
                    this.shareProduct(type);
                });
            });
        }

        shareProduct(type) {
            const productTitle = document.querySelector('.product-title').textContent;
            const productUrl = window.location.href;
            const productImage = document.getElementById('mainProductImage').src;

            switch (type) {
                case 'wechat':
                    this.shareToWechat(productTitle, productUrl, productImage);
                    break;
                case 'weibo':
                    this.shareToWeibo(productTitle, productUrl, productImage);
                    break;
                case 'qq':
                    this.shareToQQ(productTitle, productUrl, productImage);
                    break;
                case 'link':
                    this.copyLink(productUrl);
                    break;
            }
        }

        shareToWechat(title, url, image) {
            // 这里可以集成微信分享SDK
            this.showMessage('请使用微信扫描二维码分享');
            // 实际项目中这里会生成分享二维码
        }

        shareToWeibo(title, url, image) {
            const shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&pic=${encodeURIComponent(image)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        shareToQQ(title, url, image) {
            const shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&pics=${encodeURIComponent(image)}`;
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }

        copyLink(url) {
            navigator.clipboard.writeText(url).then(() => {
                this.showMessage('链接已复制到剪贴板');
            }).catch(() => {
                // 兼容性处理
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showMessage('链接已复制到剪贴板');
            });
        }

        showMessage(message) {
            const messageEl = document.createElement('div');
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                z-index: 1000;
            `;
            document.body.appendChild(messageEl);

            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 2000);
        }
    }

    // 初始化分享功能
    if (document.querySelector('.share-buttons')) {
        new ShareManager();
    }

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    img.src = dataSrc;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    lazyImages.forEach(img => {
        // 添加data-src属性用于懒加载
        if (!img.hasAttribute('data-src') && img.src) {
            img.setAttribute('data-src', img.src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        }
        imageObserver.observe(img);
    });

    // 评价系统功能
    class ReviewSystem {
        constructor() {
            this.viewAllBtn = document.querySelector('.view-all-reviews-btn');
            this.reviewsList = document.querySelector('.reviews-list');
            this.init();
        }

        init() {
            if (this.viewAllBtn) {
                this.viewAllBtn.addEventListener('click', () => this.loadMoreReviews());
            }
        }

        loadMoreReviews() {
            // 模拟加载更多评价
            const newReviews = [
                {
                    name: '王先生',
                    date: '2024-03-15',
                    rating: '★★★★★',
                    content: '苹果品质非常好，包装精美，物流也很快。'
                },
                {
                    name: '刘女士',
                    date: '2024-03-12',
                    rating: '★★★★☆',
                    content: '口感不错，价格实惠，会再次购买。'
                }
            ];

            newReviews.forEach(review => {
                const reviewItem = this.createReviewItem(review);
                this.reviewsList.appendChild(reviewItem);
            });

            this.viewAllBtn.style.display = 'none';
            this.showMessage('已加载所有评价');
        }

        createReviewItem(review) {
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <div class="reviewer-info">
                    <span class="reviewer-name">${review.name}</span>
                    <span class="review-date">${review.date}</span>
                    <span class="review-rating">${review.rating}</span>
                </div>
                <p class="review-content">${review.content}</p>
            `;
            return item;
        }

        showMessage(message) {
            const messageEl = document.createElement('div');
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                z-index: 1000;
            `;
            document.body.appendChild(messageEl);

            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 2000);
        }
    }

    // 初始化评价系统
    if (document.querySelector('.reviews-summary')) {
        new ReviewSystem();
    }

    // 相关产品点击跟踪
    const relatedProducts = document.querySelectorAll('.related-product-card');
    relatedProducts.forEach(product => {
        product.addEventListener('click', function (e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('a');
                if (link) {
                    // 这里可以集成点击统计
                    console.log('点击相关产品:', this.querySelector('h3').textContent);
                    window.location.href = link.href;
                }
            }
        });
    });

    // 页面访问统计
    function trackProductView() {
        const productId = window.location.pathname.split('/').pop();
        const productTitle = document.querySelector('.product-title').textContent;

        console.log('产品详情页访问:', productTitle, productId);
        // 这里可以集成百度统计、Google Analytics等
        // gtag('event', 'view_item', {
        //     'items': [{
        //         'id': productId,
        //         'name': productTitle
        //     }]
        // });
    }

    // 性能监控
    window.addEventListener('load', function () {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('产品详情页加载时间:', loadTime + 'ms');

        trackProductView();
    });

    // 错误监控
    window.addEventListener('error', function (e) {
        console.error('产品详情页错误:', e.error);
        // 这里可以集成错误上报服务
    });

    // SEO优化：设置结构化数据
    function setProductStructuredData() {
        const productData = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": document.querySelector('.product-title').textContent,
            "description": document.querySelector('.product-description p').textContent,
            "image": document.getElementById('mainProductImage').src,
            "sku": document.querySelector('.product-sku').textContent.replace('产品编号: ', ''),
            "offers": {
                "@type": "Offer",
                "price": parseFloat(document.querySelector('.current-price').textContent.replace('¥', '')),
                "priceCurrency": "CNY",
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "内黄县果树协会"
                }
            },
            "brand": {
                "@type": "Brand",
                "name": "内黄县果树协会"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "128"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(productData);
        document.head.appendChild(script);
    }

    // 初始化结构化数据
    setProductStructuredData();

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

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// 产品展示页专用JavaScript
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').innerText=new Date().getFullYear();
    // 获取DOM元素
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productsGrid = document.getElementById('productsGrid');
    const totalResults = document.getElementById('totalResults');
    const productCards = document.querySelectorAll('.product-card');
    
    // 初始化产品数据
    let products = Array.from(productCards).map(card => ({
        element: card,
        category: card.getAttribute('data-category'),
        price: parseFloat(card.getAttribute('data-price')),
        popularity: parseInt(card.getAttribute('data-popularity')),
        title: card.querySelector('.product-title').textContent.toLowerCase(),
        desc: card.querySelector('.product-desc').textContent.toLowerCase()
    }));
    
    // 更新结果计数
    function updateResultCount(count) {
        if (totalResults) {
            totalResults.textContent = count;
        }
    }
    
    // 搜索功能
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        products.forEach(product => {
            const matchesSearch = searchTerm === '' || 
                product.title.includes(searchTerm) || 
                product.desc.includes(searchTerm);
            
            product.element.style.display = matchesSearch ? 'block' : 'none';
        });
        
        // 应用当前筛选和排序
        applyFilters();
    }
    
    // 筛选功能
    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const sortBy = sortFilter.value;
        
        // 首先应用搜索和分类筛选
        let visibleProducts = products.filter(product => {
            const isVisible = product.element.style.display !== 'none';
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return isVisible && matchesCategory;
        });
        
        // 排序
        visibleProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'popular':
                    return b.popularity - a.popularity;
                case 'newest':
                default:
                    return 0; // 默认顺序（按HTML顺序）
            }
        });
        
        // 重新排列产品网格
        productsGrid.innerHTML = '';
        visibleProducts.forEach(product => {
            productsGrid.appendChild(product.element);
        });
        
        // 更新结果计数
        updateResultCount(visibleProducts.length);
        
        // 添加动画效果
        visibleProducts.forEach((product, index) => {
            setTimeout(() => {
                product.element.classList.add('fade-in');
            }, index * 100);
        });
    }
    
    // 事件监听器
    searchInput.addEventListener('input', debounce(function() {
        handleSearch();
    }, 300));
    
    categoryFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('.product-image img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 分页功能（前端模拟）
    const pageBtns = document.querySelectorAll('.page-btn');
    let currentPage = 1;
    const productsPerPage = 8; // 每页显示8个产品
    
    function updatePagination() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        
        pageBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === currentPage.toString()) {
                btn.classList.add('active');
            }
        });
        
        // 显示当前页的产品
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        
        products.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.element.style.display = 'block';
            } else {
                product.element.style.display = 'none';
            }
        });
        
        applyFilters(); // 应用当前筛选
    }
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            if (this.textContent === '上一页') {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            } else if (this.textContent === '下一页') {
                const totalPages = Math.ceil(products.length / productsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            } else if (!isNaN(parseInt(this.textContent))) {
                currentPage = parseInt(this.textContent);
                updatePagination();
            }
        });
    });
    
    // 初始化分页
    updatePagination();
    
    // 添加到购物车功能
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // 这里可以集成购物车逻辑
            console.log('添加到购物车:', productTitle, productPrice);
            
            // 显示添加成功反馈
            showMessage('已添加到购物车');
        });
    });
    
    // 查看详情功能
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productLink = productCard.querySelector('.product-title a');
            
            if (productLink && productLink.href) {
                window.location.href = productLink.href;
            }
        });
    });
    
    // 工具函数：防抖
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
    
    // 显示消息提示
    function showMessage(message) {
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
        `;
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 3000);
    }
    
    // 性能监控
    window.addEventListener('load', function() {
        // 页面加载性能
        const loadTime = performance.now();
        console.log('页面加载时间:', loadTime + 'ms');
    });
    
    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('JavaScript错误:', e.error);
    });
    
    // 初始化
    updateResultCount(products.length);
});

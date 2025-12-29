// 产品展示页专用JavaScript
// 产品列表数据
var datas = [
    {
        "fenlei": "tree",
        "name": "抗重茬桃苗",
        "desc": "抗重茬桃苗是利用抗重茬砧木进行无性繁殖的扦插苗木，主要克服桃树种植中的再植障碍问题，其特点在于他的抗重茬病、抗根结线虫、抗干旱、耐瘠薄、长势旺盛、接穗亲和力更强，有助于果树的提前丰产。",
        "img": "/images/productions/peach/kangzhen1hao.webp"
    },
    {
        "fenlei": "wildPeach",
        "name": "兴农红2号",
        "desc": "特早熟桃品种兴农红2号，是2017年河南省林木审定委员会审定的良种极早熟个头大，品质好，露天种植，大棚的价钱，是极早熟品种的首选。",
        "img": "/images/productions/peach/tao1.webp"
    },
    {
        "fenlei": "doughnutPeach",
        "name": "中油蟠9号",
        "desc": " 中油蟠9号，单果重200克，大果350克。果肉黄色，半不溶质、致密，风味浓甜，可溶性固形物15%。品质上，黏核，丰产。郑州地区7月上中旬成熟，需套袋栽培。",
        "img": "/images/productions/peach/yp9.webp"
    }, {
        "fenlei": "doughnutPeach",
        "name": "中油蟠7号",
        "desc": "单果重300克，大果450克。果肉黄色，硬溶质、致密，风味浓甜，可溶性固形物16%。品质上，黏核，丰产。郑州地区7月中旬成熟，需套袋栽培。",
        "img": "/images/productions/peach/yp7.webp"
    }, {
        "fenlei": "doughnutPeach",
        "name": "中油蟠13号",
        "desc": "中油蟠13号是中国农业科学院郑州果树研究所选育的早熟黄肉油蟠桃新品种，具有以下特点：<br/>果实特性<br/>外观‌：果实扁平形，果顶微凹，缝合线浅，果皮底色黄色，成熟时果面着红色霞晕‌。<br/>果肉‌：硬溶质，质地致密耐储运，粘核，风味浓甜，可溶性固形物含量15%-20%（完熟时可达20%）‌。<br/>单果重‌：120-220克，大果可达160-180克‌。<br/>栽培特性<br/>成熟期‌：郑州地区6月中旬成熟，较中油蟠5号早10-12天；平谷地区7月上中旬采收‌。<br/>适应性‌：适合露地及设施栽培，耐寒（-15℃至35℃），南方需避雨栽培降低裂果率，北方需培土防寒‌。<br/>丰产性‌：自花结实能力强，定植15个月即可结果，亩产可达6000斤‌。",
        "img": "/images/productions/peach/yp13.webp"
    },
    {
        "fenlei": "doughnutPeach",
        "name": "中油蟠8号",
        "desc": "中油蟠8号是中国农业科学院郑州果树研究所培育的早熟白肉油蟠桃新品种，‌<br/>外观‌：果形平整光滑无毛，果皮50%着红色，成熟后呈现一致状态，无需套袋栽培。 ‌<br/>重量‌：平均单果重180-220克，最大可达400克以上。 ‌<br/>口感‌：果肉纯白色，硬溶质，香甜多汁，可溶性固形物含量16%-18%，完全成熟可达20%以上。 ‌‌<br/>生长特性:‌<br/>成熟期‌：郑州地区6月底成熟，华北地区7月中旬成熟。 ‌‌<br/>抗病性‌：对褐腐病等病害有较强抗性，自花结实率达82%，丰产性强。 ‌‌",
        "img": "/images/productions/peach/yp8.webp"
    },
    {
        "fenlei": "doughnutPeach",
        "name": "中油蟠10号",
        "desc": "果实扁平，平均单果重150克，大果200克以上，白肉油蟠桃，硬溶质，风味甜，可溶性固形物平均14%左右，高糖果16%。品质上，黏核、丰产，大花型，自花结实，郑州地区6月初成熟。",
        "img": "/images/productions/peach/yp10.webp"
    },
    {
        "fenlei": "doughnutPeach",
        "name": "中油蟠11号",
        "desc": "中油蟠11号自花结实，极丰产，极早熟，基本不裂果；露地管理容易，不用疏果和套袋，是露地生产优质、小果形精品极早熟油蟠桃的首选品种",
        "img": "/images/productions/peach/zhongyoupan11.webp"
    },
    {
        "fenlei": "doughnutPeach",
        "name": "中油蟠桃5号",
        "desc": "是由中国农业科学院郑州果树研究所最新培育的油蟠桃。平均单果重180克，大果250克。黄肉，风味浓甜。丰产。该品种主要特点为早熟、大果、肉硬、肉厚、味甜。该品种自花结实，在河南内黄地区6月底成熟。",
        "img": "/images/productions/peach/tao15.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油珠玉",
        "desc": "中国农业科学院郑州果树研究所选育的极早熟白肉小果型油桃新品种。果实圆形，果顶平，果面着亮红色，单果重60-80克，大果120克，肉质细白，口感硬脆，风味香甜，非常爽口。可溶性固形物含量16-20%，最高可达28%。品质上，黏核，丰产性好，挂树时间长，需冷量短。郑州地区5月底成熟，可作为小果型油桃规模化发展，发挥其商品性好及省力化栽培特点。设施栽培可溶性固形物14-18%，风味品质表现出色。",
        "img": "/images/productions/peach/zyzy.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "中桃颜玉4号",
        "desc": "果实圆形，果顶稍凹，单果重200g，大果250g左右，白肉毛桃，硬溶质，风味甜、口感脆，可溶性固形物含量15%左右。品质上，粘核，丰产，大花型，自花结实，郑州地区6月上旬成熟，果面近全红（郑果所新乡基地）。在中桃联合体安徽六安、湖北襄阳等试验基地，单果重200g，大果300g以上，可溶性固形物含量12.6%~15.3%。",
        "img": "/images/productions/peach/yy4.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "锦绣黄桃",
        "desc": "锦绣黄桃外观漂亮，肉色金黄，果形整齐匀称，最大果重700克左右，糖份高于南汇水蜜桃，平均糖份在13-15度，核小。成熟后肉质较软，食时软中带硬，甜多酸少，有香气，水分中等，风味诱人。成熟时间一般在8月中旬至9月上旬，是秋季水果市场上的佳品。",
        "img": "/images/productions/peach/tao8.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油金铭",
        "desc": "其果实呈现出优美的椭圆形，果面展现出令人惊艳的全红之色，仿佛被大自然精心描绘上了一层鲜艳的色彩。不仅如此，它的果型硕大，单果重量通常可达 250 克，在理想的生长条件下，大果甚至能超过 450 克，郑州地区6月下旬成熟。",
        "img": "/images/productions/peach/zyjm.webp"
    }, {
        "fenlei": "nectarine",
        "name": "8-18黄肉桃",
        "desc": "8-18油桃果实圆整，果顶平，肉质硬。果大，平均单果重210克，大果300克。果肉黄色，硬溶质，风味浓甜，可溶性固形物15%，粘核。河南地区7月上旬成熟。",
        "img": "/images/productions/peach/tao0.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "春蜜",
        "desc": "春蜜桃单果重150-205克，果面鲜红色，艳丽美观，白肉，硬溶质，风味浓甜。含糖11-12%，自花结实 ，极丰产，6月上旬成熟。",
        "img": "/images/productions/peach/tao4.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "春美",
        "desc": "春美桃为早熟硬肉、全红型白肉桃品种，自花结实力强，极丰产。果实近圆形，平均单果重156克，大果250克以上；果皮底色乳白，成熟后整个果面着鲜红色，艳丽美观；果肉白色，肉质细，硬溶质，风味浓甜，可溶性固形物12%～14%，品质优。成熟后不易变软，耐贮运，可留树10天以上不落果、不裂果,适合全国各桃产区栽培。",
        "img": "/images/productions/peach/tao5.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "秋彤桃",
        "desc": "秋彤桃两侧果肉对称，成熟度一致;果实大，平均单果质量336g，最大438g;果面茸毛稀少，果皮底色黄白，成熟时85%果面着鲜红到紫红色晕，光照条件好时全果着鲜红色，外观艳丽。秋彤桃8月底9月初成熟，果肉淡绿白色，离核。含糖量18%。 硬容质， 常温下可储藏20天。",
        "img": "/images/productions/peach/qiutongtao.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "映霜红",
        "desc": "映霜红桃的六大特点是：晚熟、耐藏、个大、优质、丰产，成熟期10月中、下旬，树上留果至11月上旬；单果重216.5克，最大425克；果面着鲜艳的玫瑰红色，光彩亮丽，极其漂亮;含糖18.1%，果肉脆甜可口，清香宜人，风味极佳，品质超群；丰产性特强。",
        "img": "/images/productions/peach/tao3.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "国庆红",
        "desc": "国庆红桃9月上旬果实成熟，果实巨大，平顶端正，颜色鲜艳浓红，单果重300-1000克，白肉粘核，果肉脆甜，口感极佳",
        "img": "/images/productions/peach/tao6.webp"
    }, {
        "fenlei": "wildPeach",
        "name": "锦园黄桃",
        "desc": "锦园黄桃是中晚熟黄桃的新品种，该品种果实平均单果质量206g。可溶性固形物12%-14.5%．果实近圆形，黄肉味甜粘核，有花粉，产量稳定",
        "img": "/images/productions/peach/tao9.webp"
    }, {
        "fenlei": "flatPeach",
        "name": "中蟠11号",
        "desc": "中蟠11号平均单果重250克，大果300克以上; 果皮有毛，底色黄，果面80%以上着鲜红色晕，十分美观，皮不能剥离;果肉橙黄色，肉质为硬溶质,耐贮运;纤维中等;果实风味浓甜,有香味，可溶性固形物含量15%。粘核,在河南省内黄县，7月中下旬成熟。",
        "img": "/images/productions/peach/tao10.webp"
    }, {
        "fenlei": "flatPeach",
        "name": "中蟠13号",
        "desc": "中蟠13号—黄肉蟠桃，7月上旬成熟，果皮75%着红色、茸毛短、干净、漂亮，似水洗一般，果实大、均匀，果顶平、果肉厚、细腻、不撕皮，单果重180克，风味浓甜、香，极丰产，综合性状很好，适宜规模化发展。",
        "img": "/images/productions/peach/tao11.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油16油桃",
        "desc": "中油16果实白肉，脆甜爽口，6月8日左右开始成熟，果实可以挂树到7月上旬也不变软，耐贮存，单果重180～200克，自花结实，丰产性强，是目前最有发展前景的油桃品种。",
        "img": "/images/productions/peach/tao12.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油18油桃",
        "desc": "中油18早熟白肉油桃。6月中上旬成熟，果实发育期约69天。果形圆正，端正美观。外观全红，色泽鲜艳。单果重160—263克，口感脆甜，可溶性固形物13%—14%，粘核，品质优良。留树时间长，极耐贮运。有花粉，极丰产。适合建大型基地，远距离运销。",
        "img": "/images/productions/peach/tao14.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油8号",
        "desc": "8月上旬成熟，单果重210克，大果300克，浓甜、丰产、有花粉、果实圆整，果顶圆，果实80%着红色。果肉呈黄色，硬溶质，耐贮运，可溶性固形物14%，粘核，丰产。",
        "img": "/images/productions/peach/zhongpan8hao.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油金瑞",
        "desc": "果实圆整，果顶圆，单果重210克，大果250克，果实80%着红色。果肉橙黄色，硬溶质，耐贮运，风味浓甜，可溶性固形物14%，粘核。丰产。郑州地区8月上旬成熟。",
        "img": "/images/productions/peach/zhongyoujinrui.webp"
    }, {
        "fenlei": "nectarine",
        "name": "中油21",
        "desc": "特晚熟、优质、离核油桃品种。9月中下旬成熟，适逢中秋、国庆双节上市，果实发育期约170天。果形圆整，套袋后，果面金黄色，十分美观。单果重205-310克，可溶性固溶物18-20%，甜香味浓，品质极上。离核。有花粉，极丰产。",
        "img": "/images/productions/peach/zhongyou21hao.webp"
    }]
var str = '';
var categoryObj = {
    "tree": "抗重茬砧木苗",
    "doughnutPeach": "油蟠桃",
    "flatPeach": "蟠桃",
    "wildPeach": "毛桃",
    "nectarine": "油桃",
}
datas.forEach((item, i) => {
    str = str + `
                <article class="product-card" data-category="${item.fenlei}" data-popularity="${i}">
                    <div class="product-image">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3C/svg%3E" data-src="${item.img}" alt="${item.name}" loading="lazy" width="300" height="200">
                        <div class="product-badge">${categoryObj[item.fenlei]}</div>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title"><a href="/a/product-detail.html?name=${item.name}">${item.name}</a></h3>
                        <p class="product-desc">${item.desc.substring(0, 46)}...</p>
                    </div>
                </article>
            `;
})

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('year').innerText = new Date().getFullYear();
    document.getElementById('productsGrid').innerHTML = str;
    // 获取DOM元素
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
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
        console.log(searchTerm)
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

        // 首先应用搜索和分类筛选
        let visibleProducts = products.filter(product => {
            const isVisible = product.element.style.display !== 'none';
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return isVisible && matchesCategory;
        });

        // 排序
        // visibleProducts.sort((a, b) => {
        //     switch (sortBy) {
        //         case 'price-asc':
        //             return a.price - b.price;
        //         case 'price-desc':
        //             return b.price - a.price;
        //         case 'popular':
        //             return b.popularity - a.popularity;
        //         case 'newest':
        //         default:
        //             return 0; // 默认顺序（按HTML顺序）
        //     }
        // });

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
    searchInput.addEventListener('input', debounce(function () {
        handleSearch();
    }, 300));

    categoryFilter.addEventListener('change', applyFilters);
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
        btn.addEventListener('click', function () {
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
    // updatePagination();

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
    window.addEventListener('load', function () {
        // 页面加载性能
        const loadTime = performance.now();
        console.log('页面加载时间:', loadTime + 'ms');
    });

    // 错误处理
    window.addEventListener('error', function (e) {
        console.error('JavaScript错误:', e.error);
    });

    // 初始化
    updateResultCount(products.length);
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
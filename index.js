/* 初始化轮播 */
const glide = new Glide('.glide');
// 获取轮播说明区域；
const captionEles = document.querySelectorAll('.slide_caption');
// 当轮播加载完成后，每个轮播完成时，加载标题动画
glide.on(['mount.after', 'run.after'], () => {
  // 获取当前轮播的那项说明区域；
  const caption = captionEles[glide.index] ;

  anime({
    // 对每个说明区域的子元素进行动画
    targets: caption.children,
    // 透明度
    opacity: [0, 1],
    duration: 400,
    easing: 'linear',
    // 每个子元素相继延迟400ms，第一个延迟300ms
    delay: anime.stagger(400, { start: 300 }),
    // 从下向上移动，每行从40到10递减，最后移动到0(这里 h1：40，h3：40-10区间，按钮：10)
    translateY: [anime.stagger([40, 10]), 0]
  })
});

// 每次轮播前，把透明度设置为0，还原；
glide.on('run.before', () => {
  document.querySelectorAll('.slide_caption > *').forEach(el => {
    el.style.opacity = 0;
  })
})


// 加载轮播
glide.mount();

/** 
 * 成功案列筛选
 * 初始化isotope
*/
const isotope = new Isotope('.cases', {
  // 适应布局，每行宽度一样
  layoutMode: 'fitRows',
  // 每个案例的class选择器
  itemSelector: '.case_item',
});

// const filterBtns = document.querySelector('.filter_btns');
// filterBtns.addEventListener('click', e => {
//   const { target } = e;
//   const filterOption = target.getAttribute('data-filter');

//   if (filterOption) {
//     // 取消其它按钮active状态
//     const activeBtns = document.querySelectorAll('.filter_btn.active');
//     activeBtns.forEach(btn => btn.classList.remove('active'));
    
//     target.classList.add('active');

//     //筛选
//     isotope.arrange({ filter: filterOption });
//   }
// })

/* 
  滚动固定头部导航 
  显示回到顶部按钮
*/
const headerEle = document.querySelector('header');
const scrollTopEle = document.querySelector('.scrollToTop');

window.addEventListener('scroll', (e) => {
  const hHeight = headerEle.getBoundingClientRect().height;

  if (window.scrollY - hHeight > 800) {
    if (!headerEle.classList.contains('sticky')) {
      headerEle.classList.add('sticky')
    }
  } else {
    headerEle.classList.remove('sticky')
  }

  if (window.scrollY >= 1800) {
    scrollTopEle.style.display = 'block'
  } else {
    scrollTopEle.style.display = 'none'
  }
});

/*
  滚动展示插件
  通用动画配置，从底部50象素滑出来
*/
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: 'ease-in-out',
  origin: 'bottom'
};
// 滚动到关于我们、服务流程时的展示动画，interval需要单独设置，每个feature元素相继350毫秒，下同
ScrollReveal().reveal('.feature', { ...staggeringOption, interval: 350 });
ScrollReveal().reveal('.service_item', { ...staggeringOption, interval: 350 });

// 数据模块：数字播放
const dataSectionEl = document.querySelector(".data_section");
ScrollReveal().reveal(".data_section", {
  beforeReveal: () => {
    // 在展示之前，加载anime动画，使数据从0增长到定义好的数值
    anime({
      targets: ".data_piece .num",
      innerHTML: el => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo"
    });
  }
});

/* 
  平滑滚动到相应区域
  传入选中元素 
*/
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  // 自动计算固定导航的高度
  header: 'header',
  // 便宜80像素
  offset: 80
});
// 探索更多按钮
const exploreBtnEls = document.querySelectorAll('.explore_btn');
exploreBtnEls.forEach(elBtn => {
  elBtn.addEventListener('click', () => {
    scroll.animateScroll(document.querySelector('#about_us'))
  })
});


/**
 * 响应式
*/
const collapseEle = document.querySelector('.collapse');
collapseEle.addEventListener('click', () => {
  // headerEle.classList.add('open');
  // 如果 open 类值已存在，则移除它，否则添加它
  headerEle.classList.toggle('open');
});

// 折叠菜单打开时，如果点击了链接，则自动关闭全屏导航，监听滚动(注意命名固定为 上面new SmoothScroll出来的scroll+Start)；
document.addEventListener('scrollStart', () => {
  if (headerEle.classList.contains('open')) {
    headerEle.classList.remove('open')
  }
});
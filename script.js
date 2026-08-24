document.addEventListener('DOMContentLoaded', () => {
    // 角色 Tab 切换元素
    const tabs = {
        shinichi: document.getElementById('tab-shinichi'),
        ran: document.getElementById('tab-ran'),
        kid: document.getElementById('tab-kid'),
        heiji: document.getElementById('tab-heiji'),
        kazuha: document.getElementById('tab-kazuha'),
        kogoro: document.getElementById('tab-kogoro')
    };

    const containers = {
        shinichi: document.getElementById('container-shinichi'),
        ran: document.getElementById('container-ran'),
        kid: document.getElementById('container-kid'),
        heiji: document.getElementById('container-heiji'),
        kazuha: document.getElementById('container-kazuha'),
        kogoro: document.getElementById('container-kogoro')
    };

    // 交互卡片元素
    const cards = {
        shinichi: document.getElementById('card-shinichi'),
        ran: document.getElementById('card-ran'),
        kid: document.getElementById('card-kid'),
        heiji: document.getElementById('card-heiji'),
        kazuha: document.getElementById('card-kazuha'),
        kogoro: document.getElementById('card-kogoro')
    };

    const flipBtn = document.getElementById('flip-btn');
    const btnIcon = document.getElementById('btn-icon');
    const btnText = document.getElementById('btn-text');

    let currentRole = 'shinichi'; // 当前选中的角色

    // 角色特有按钮样式及翻转文案配置
    const roleConfig = {
        shinichi: { theme: '', icon: '🎀', frontTxt: '解密生日真相', backTxt: '锁定生日真相' },
        ran: { theme: 'ran-theme', icon: '🌸', frontTxt: '开启温情祝愿', backTxt: '锁定温情祝愿' },
        kid: { theme: 'kid-theme', icon: '🃏', frontTxt: '揭晓魔术预告', backTxt: '锁定魔术秘密' },
        heiji: { theme: 'heiji-theme', icon: '🏍️', frontTxt: '查看热血誓言', backTxt: '锁定热血誓言' },
        kazuha: { theme: 'kazuha-theme', icon: '🍀', frontTxt: '开启御守祝福', backTxt: '锁定御守祝福' },
        kogoro: { theme: 'kogoro-theme', icon: '🍺', frontTxt: '接受名侦探干杯', backTxt: '锁定干杯瞬间' }
    };

    // 1. 角色 Tab 切换交互
    Object.keys(tabs).forEach(role => {
        tabs[role].addEventListener('click', () => {
            if (currentRole === role) return;
            currentRole = role;

            // 切换所有Tab和卡片的激活状态
            Object.keys(tabs).forEach(r => {
                if (r === role) {
                    tabs[r].classList.add('active');
                    containers[r].classList.add('active');
                } else {
                    tabs[r].classList.remove('active');
                    containers[r].classList.remove('active');
                }
            });

            // 动态切换翻转按钮主题与图标
            const config = roleConfig[role];
            flipBtn.className = `bow-tie-btn ${config.theme}`.trim();
            btnIcon.textContent = config.icon;

            // 同步当前卡片的翻转状态文字
            const isFlipped = cards[role].classList.contains('flipped');
            btnText.textContent = isFlipped ? config.backTxt : config.frontTxt;
        });
    });

    // 2. 卡片翻转公共逻辑
    function toggleFlip() {
        const activeCard = cards[currentRole];
        activeCard.classList.toggle('flipped');
        
        const isFlipped = activeCard.classList.contains('flipped');
        const config = roleConfig[currentRole];
        btnText.textContent = isFlipped ? config.backTxt : config.frontTxt;
    }

    // 支持点击当前卡片本身，或点击底部动作按钮进行平滑 3D 翻转
    Object.keys(cards).forEach(role => {
        cards[role].addEventListener('click', toggleFlip);
    });
    
    flipBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止冒泡
        toggleFlip();
    });
});
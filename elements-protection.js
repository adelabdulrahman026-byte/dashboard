// elements-protection.js
class ElementsTabProtection {
    constructor() {
        this.originalBodyHTML = document.body.innerHTML;
        this.devToolsOpen = false;
        this.init();
    }

    init() {
        this.monitorDevTools();
        this.setupMutationObserver();
        this.protectKeyboard();
        this.protectContextMenu();
    }

    // مراقبة أدوات المطور
    monitorDevTools() {
        setInterval(() => {
            const widthThreshold = window.outerWidth - window.innerWidth > 100;
            const heightThreshold = window.outerHeight - window.innerHeight > 100;
            
            if (widthThreshold || heightThreshold) {
                if (!this.devToolsOpen) {
                    this.devToolsOpen = true;
                    this.protectElementsTab();
                }
            } else {
                this.devToolsOpen = false;
                this.restoreContent();
            }
        }, 1000);
    }

    // حماية tab ال Elements
    protectElementsTab() {
        // حفظ المحتوى الأصلي
        this.originalBodyHTML = document.body.innerHTML;
        
        // استبدال المحتوى برسالة الحماية
        document.body.innerHTML = this.getProtectionMessage();
        
        // إضافة ستايل لإخفاء المحتوى الأصلي
        this.addProtectionStyles();
    }

    getProtectionMessage() {
        return `
            <div class="devtools-protection-message">
                <div class="protection-content">
                    <div class="warning-icon">⚠️</div>
                    <h2>DevTools Detected</h2>
                    <p>Content unavailable</p>
                    <small>Please close developer tools to view content</small>
                </div>
            </div>
        `;
    }

    addProtectionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .devtools-protection-message {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                text-align: center;
            }
            
            .protection-content {
                background: rgba(255, 255, 255, 0.1);
                padding: 40px;
                border-radius: 20px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .warning-icon {
                font-size: 50px;
                margin-bottom: 20px;
            }
            
            .protection-content h2 {
                margin: 0 0 10px 0;
                font-size: 28px;
                color: #ff6b6b;
            }
            
            .protection-content p {
                margin: 0 0 10px 0;
                font-size: 18px;
                opacity: 0.9;
            }
            
            .protection-content small {
                opacity: 0.7;
                font-size: 12px;
            }
            
            /* إخفاء كل العناصر الأخرى */
            body > *:not(.devtools-protection-message) {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // استعادة المحتوى الأصلي
    restoreContent() {
        const protectionMessage = document.querySelector('.devtools-protection-message');
        if (protectionMessage) {
            protectionMessage.remove();
        }
        
        // إزالة الستايل
        const protectionStyle = document.querySelector('style');
        if (protectionStyle) {
            protectionStyle.remove();
        }
        
        // استعادة المحتوى الأصلي
        document.body.innerHTML = this.originalBodyHTML;
    }

    // مراقبة التغييرات في DOM
    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            if (this.devToolsOpen) {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        // إذا تمت إضافة عناصر جديدة، نحميها
                        this.protectNewElements(mutation.addedNodes);
                    }
                });
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    protectNewElements(nodes) {
        nodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
                if (!node.classList.contains('devtools-protection-message')) {
                    node.style.display = 'none';
                }
            }
        });
    }

    // حماية لوحة المفاتيح
    protectKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12') {
                e.preventDefault();
                this.devToolsOpen = true;
                this.protectElementsTab();
                
                // إظهار رسالة في Console أيضاً
                console.log('%c⚠️ DevTools Detected - Content unavailable', 
                    'color: red; font-size: 16px; font-weight: bold;');
            }
        });
    }

    // منع النقر الأيمن
    protectContextMenu() {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
}

// بدء الحماية
document.addEventListener('DOMContentLoaded', () => {
    window.elementsProtection = new ElementsTabProtection();
});

// كود إضافي للحماية القصوى
setInterval(() => {
    const protectionMessage = document.querySelector('.devtools-protection-message');
    const devToolsOpen = window.outerWidth - window.innerWidth > 100;
    
    if (devToolsOpen && !protectionMessage) {
        document.body.innerHTML = `
            <div class="devtools-protection-message">
                <div class="protection-content">
                    <div class="warning-icon">⚠️</div>
                    <h2>DevTools Detected</h2>
                    <p>Content unavailable</p>
                </div>
            </div>
            <style>
                .devtools-protection-message {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: #000;
                    color: white;
                    font-family: Arial, sans-serif;
                }
                body > *:not(.devtools-protection-message) {
                    display: none !important;
                }
            </style>
        `;
    }
}, 500);

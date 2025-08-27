// protect.js
(function() {
    'use strict';
    
    var protectionMessage = 'Content unavailable. Resource was not cached';
    
    // عندما يفتح المستخدم DevTools
    function overrideConsole() {
        // Override console.log وغيرها
        console.log = function() {
            return protectionMessage;
        };
        console.error = function() {
            return protectionMessage;
        };
        console.warn = function() {
            return protectionMessage;
        };
        console.info = function() {
            return protectionMessage;
        };
    }
    
    // محاولة اكتشاف فتح DevTools
    var devToolsOpen = false;
    
    setInterval(function() {
        var widthThreshold = window.outerWidth - window.innerWidth > 160;
        var heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if ((widthThreshold || heightThreshold) && !devToolsOpen) {
            devToolsOpen = true;
            overrideConsole();
            debugger; // يوقف التنفيذ ويوجه للـ Sources
        }
    }, 1000);
    
    // منع مفاتيح DevTools
    document.addEventListener('keydown', function(e) {
        if (
            e.key === 'F12' || 
            e.keyCode === 123 ||
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C')
        ) {
            e.preventDefault();
            overrideConsole();
            debugger;
            return false;
        }
    });
    
    // منع right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
})();

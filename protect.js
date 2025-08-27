// protect.js
document.addEventListener('DOMContentLoaded', function() {
    // منع F12
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || e.keyCode === 123) {
            e.preventDefault();
            alert('Content unavailable. Resource was not cached');
            return false;
        }
        
        // منع Ctrl+U (View Source)
        if (e.ctrlKey && (e.key === 'u' || e.keyCode === 85)) {
            e.preventDefault();
            alert('Content unavailable. Resource was not cached');
            return false;
        }
        
        // منع Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.keyCode === 73)) {
            e.preventDefault();
            alert('Content unavailable. Resource was not cached');
            return false;
        }
        
        // منع Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.keyCode === 74)) {
            e.preventDefault();
            alert('Content unavailable. Resource was not cached');
            return false;
        }
        
        // منع Ctrl+Shift+C (Inspect)
        if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.keyCode === 67)) {
            e.preventDefault();
            alert('Content unavailable. Resource was not cached');
            return false;
        }
    });

    // منع النقر بزر الماوس الأيمن
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Content unavailable. Resource was not cached');
        return false;
    });

    // منع سحب المحتوى
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // منع نسخ المحتوى (اختياري)
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        alert('Content unavailable. Resource was not cached');
        return false;
    });
});

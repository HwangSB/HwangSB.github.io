function initClock() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    
    function updateClock() {
        const now = new Date();
        
        // Format time (HH:MM:SS)
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Format date (YYYY년 MM월 DD일 요일)
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const dayName = dayNames[now.getDay()];
        const dateString = `${year}년 ${month}월 ${day}일 ${dayName}`;
        
        if (timeElement) {
            timeElement.textContent = timeString;
        }
        
        if (dateElement) {
            dateElement.textContent = dateString;
        }
    }
    
    updateClock();
    
    setInterval(updateClock, 1000);
}

// Initialize clock when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initClock();
});

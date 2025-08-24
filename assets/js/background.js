function initBackground() {
    const backgroundContainer = document.getElementById('background-container');
    
    const backgroundImages = [
        'assets/images/0.jpg',
        'assets/images/1.jpg',
        'assets/images/2.jpg',
        'assets/images/3.jpg'
    ];
    
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        return backgroundImages[randomIndex];
    }
    
    function setBackgroundImage(imagePath) {
        if (backgroundContainer) {
            backgroundContainer.style.backgroundImage = `url('${imagePath}')`;
        }
    }
    
    function loadRandomBackground() {
        const randomImage = getRandomImage();
        setBackgroundImage(randomImage);
    }
    
    loadRandomBackground();
}

// Initialize background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBackground();
});

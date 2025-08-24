const WEATHER_API_KEY = '0a3b65662288ef1a596ab393ff434364';

function initWeather() {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const weatherDescriptionElement = document.getElementById('weather-description');
    
    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes cache???
                }
            );
        });
    }
    
    async function fetchWeatherData(lat, lon) {
        try {
            console.log(lat, lon);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`
            );
            
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
            throw error;
        }
    }
    
    function updateWeatherDisplay(weatherData) {
        if (!weatherData) return;
        
        // Update location
        if (locationElement) {
            const location = weatherData.name || '알 수 없는 위치';
            locationElement.textContent = location;
        }
        
        // Update temperature
        if (temperatureElement) {
            const temp = Math.round(weatherData.main.temp);
            temperatureElement.textContent = `${temp}°C`;
        }
        
        // Update weather description
        if (weatherDescriptionElement) {
            const description = weatherData.weather[0].description || '';
            const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
            weatherDescriptionElement.textContent = capitalizedDescription;
        }
    }
    
    function showError(message) {
        if (locationElement) {
            locationElement.textContent = '위치를 가져올 수 없음';
        }
        if (temperatureElement) {
            temperatureElement.textContent = '--°C';
        }
        if (weatherDescriptionElement) {
            weatherDescriptionElement.textContent = message;
        }
        console.error('Weather error:', message);
    }
    
    async function loadWeather() {
        try {
            // Show loading state
            if (locationElement) {
                locationElement.textContent = '위치 확인 중...';
            }
            if (temperatureElement) {
                temperatureElement.textContent = '--°C';
            }
            if (weatherDescriptionElement) {
                weatherDescriptionElement.textContent = '날씨 정보를 가져오는 중...';
            }
            
            // Get current position and fetch weather data
            const position = await getCurrentPosition();
            const weatherData = await fetchWeatherData(position.latitude, position.longitude);
            
            updateWeatherDisplay(weatherData);
            
        } catch (error) {
            let errorMessage = '날씨 정보 없음';
            
            if (error.code === 1) {
                errorMessage = '위치 접근 거부됨';
            } else if (error.code === 2) {
                errorMessage = '위치를 찾을 수 없음';
            } else if (error.code === 3) {
                errorMessage = '위치 요청 시간 초과';
            } else if (error.message.includes('API')) {
                errorMessage = '날씨 서비스 오류';
            }
            
            showError(errorMessage);
        }
    }
    
    loadWeather();
    
    setInterval(loadWeather, 10 * 60 * 1000);
}

// Initialize weather when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWeather();
});

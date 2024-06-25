document.addEventListener('DOMContentLoaded', () => {
    const car = document.querySelector('.car');
    const redLight = document.querySelector('.red');
    const greenLight = document.querySelector('.green');
    const container = document.querySelector('.container');
    const redBtn = document.querySelector('.redbtn');
    const greenBtn = document.querySelector('.greenbtn');
    let msg = document.querySelector('.message')
    let count = document.querySelector('.Count')
   count.textContent = 5
    setInterval(()=>{
        count.textContent--
        if(count.textContent <= 0){
            count.textContent = 5
        }
    },1000)

// Define the speak function
const speak = (message) => {
    let utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
};


// Call speak function on page load
document.addEventListener('click', () => {
    speak("Welcome to the traffic tracking system");
}, { once: true });
container.addEventListener('click', () => {
    speak("red signal alert !");
},);
    

    let isRedLight = false;
    let carStopped = false;
    let carCrossedZebra = false;
    // check button click for defualt changing red or green light
    // const redClick = ()=>{
    //     if(carCrossedZebra){
    //         return;
    //         }
    //         isRedLight = true;
    //         redLight.style.background = 'red';
    //         greenLight.style.background = 'gray';
    //         car.style.animation = 'none';
    //         carStopped = true;
    //     }
    //     const greenClick = ()=>{
    //             isRedLight = false;
    //             redLight.style.background = 'gray';
    //             greenLight.style.background = 'green';

    //     }

    const toggleTrafficLight = () => {
        if (isRedLight) {
            redLight.classList.remove('stop');
            greenLight.style.backgroundColor = 'green';
            redLight.style.backgroundColor = 'gray';
            msg.textContent = "you can go ahead"
        setTimeout(()=>{
            msg.textContent ="follow traffic rules";
            },1000)
        } else {
            container.click();
            redLight.classList.add('stop');
            greenLight.style.backgroundColor = 'gray';
            redLight.style.backgroundColor = 'red';
            msg.textContent = "RED signal alert !"
        setTimeout(()=>{
            msg.textContent ="follow traffic rules";
            },1000)
        }
        isRedLight = !isRedLight;
    };

    const moveCar = () => {
        const carPosition = car.offsetLeft;
        const carWidth = car.clientWidth;
        const containerWidth = container.clientWidth;
        const zebraCrossPosition = document.querySelector('.zebra-cross').offsetLeft;

        // Reset car position if it reaches the end of the container
        if (carPosition + carWidth >= containerWidth) {
            car.style.display = 'none'
            carCrossedZebra = false;
            setTimeout(() => {
                car.style.display = 'block';
                car.style.left = '0px';
                }, 100);
            moveCar()
        }

        if (!carCrossedZebra && isRedLight && carPosition + carWidth >= zebraCrossPosition) {
            car.style.left = `${zebraCrossPosition - carWidth}px`;
            carStopped = true;
        } else if (!isRedLight && carStopped) {
            carStopped = false;
        }

        if (!carStopped) {
            // msg.textContent= "Driving mode"
            // setTimeout(()=>{
            //     msg.textContent = "welcome !"
            //     },1000)
            car.style.left = `${carPosition + 100}px`;

            if (carPosition + carWidth > zebraCrossPosition) {
                carCrossedZebra = true;
            }
        }
        if(carStopped){
            
            msg.textContent = "car stopped !"
            setTimeout(()=>{
                msg.textContent = "car stopped !"
                },1000)
            
        }
    };

    setInterval(toggleTrafficLight, 5000); // Change traffic light every 5 seconds
    setInterval(moveCar, 100); // Move car every 100 ms

    const redClick = () => {
        isRedLight = true;
        redLight.classList.add('stop');
        greenLight.style.backgroundColor = 'gray';
        redLight.style.backgroundColor = 'red';
        msg.textContent = "RED signal alert !"
        setTimeout(()=>{
         msg.textContent ="follow traffic rules";
            },1000)
    };

    const greenClick = () => {
        isRedLight = false;
        redLight.classList.remove('stop');
        greenLight.style.backgroundColor = 'green';
        redLight.style.backgroundColor = 'gray';
        msg.textContent = "you can go ahead"
        setTimeout(()=>{
            msg.textContent ="follow traffic rules";
            },1000)
    };

    redBtn.addEventListener('click',redClick)
    greenBtn.addEventListener('click',greenClick)
    
});

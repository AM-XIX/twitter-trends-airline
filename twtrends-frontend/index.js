
const app = ()=>{
    let canvas = document.querySelector('#myCanvas');

    let dpr = window.devicePixelRatio;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.maxWidth = window.innerWidth + 'px';
    canvas.style.maxHeight = window.innerHeight + 'px';

    let ctx = canvas.getContext('2d');
    let trends = []

// ========== Values ==========
    fetch('http://localhost:8001/trends', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => {
        trends = response[0].trends
        drawClouds()
    });

    function drawClouds() {
        for (let i = 0; i < 12; i++) {
            // ========== Values ==========

            // -------Positioning-------
            const imgX = randomIntFromInterval(i, 1800)
            const imgY = randomIntFromInterval(i, 900)

            // -------Sizes-------
            let imgSize
            if (trends[i].tweet_volume === null) {
                imgSize = 200
            }
            else if (trends[i].tweet_volume > 150000) {
                imgSize = trends[i].tweet_volume / 350;
            }
            else if (trends[i].tweet_volume > 50000) {
            imgSize = trends[i].tweet_volume / 200;
            } 
            else if (trends[i].tweet_volume < 25000) {
            imgSize = trends[i].tweet_volume / 20;
            }
            else {
            imgSize = trends[i].tweet_volume / 200;
            }

            // -------Text-------
            const textX = imgX + (imgSize/8)
            const textY = imgY + (imgSize/3)
            ctx.fillStyle = '#4b7185';
    
            // -------Images-------
            let img = new Image()
            img.src = "assets/clouds" + randomIntFromInterval(1, 6) + ".svg"; 
    
            // ========== Draw ==========
            img.onload = () => {
                
                // -------Text-------
                if(trends[i].name.length > 15) {
                ctx.font = (imgSize / 18) +'px Rubik Microbe';
                } else {
                ctx.font = (imgSize / 14) +'px Rubik Microbe';
                }

                // -------Images-------
                ctx.shadowColor = "#333333";
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 10;
                ctx.shadowOffsetY = 10;
  
                ctx.drawImage(img, imgX, imgY, imgSize, imgSize/2);

                ctx.shadowColor = "white";
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillText(trends[i].name, textX, textY);
            }

            // ========== Arrays ==========
            const cloud = {
                x: imgX,
                y: imgY,
                w: imgSize,
                h: imgSize/2
            }
            console.log('name', trends[i].name), console.log('volume', trends[i].tweet_volume), console.log('Size', imgSize)
            clouds.push(cloud)
        }
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const clouds = [
    ]
}

document.addEventListener('DOMContentLoaded', app)
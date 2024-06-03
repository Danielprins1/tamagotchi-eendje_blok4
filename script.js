document.addEventListener('DOMContentLoaded', () => {
    console.log("Check check dubbel check");

    //https://chatgpt.com/share/fe721518-181e-454a-9dd5-8da396175cf7

    const htmlElement = document.querySelector("#voerknop");
    const progressVoedingBar = document.querySelector("#VoedingBar");
    const eendImages = document.querySelectorAll(".eend");
    const knoppen = document.querySelector(".knoppen")
    const bozeEend = document.querySelector("#bozeEend");
    const gebakkenEend = document.querySelector("#gebakkenEend");
    const audio = new Audio('Geluid/kwekken.mp3'); 

    let health = 0; // Begint bij een health van 0
    progressVoedingBar.value = health; 

    function hideAllDucks() {
        eendImages.forEach(image => {
            image.style.display = "none";
        });
    }

    function veranderingDuckImage() {
        if (health <= 25) {
            hideAllDucks();
            showDuck("img/Eend.png");
        } else if (health <= 50) {
            hideAllDucks();
            showDuck("img/Dikke_eend.png");
        } else if (health <= 75) {
            hideAllDucks();
            showDuck("img/Dikkere_eend.png");
        } else if (health <= 90) {
            hideAllDucks();
            showDuck("img/Dikste_eend.png");
        } else {
            hideAllDucks();
            showDuck("img/Gebraden_eend.png");
            health = 100; 
            progressVoedingBar.value = health; // Zorgt dat de progressBar naar 100 gaat
        }
    }


    function veranderingVoerKnop() {
        if (health <= 89) {
            knoppen.style.display = "block";
            htmlElement.src = "btns/voer.png";
            htmlElement.onclick = voerKnop;
        } else if (health <= 99) {
            knoppen.style.display = "block";
            htmlElement.src = "btns/kook.png";
            htmlElement.onclick = voerKnop;
        } else {
            knoppen.style.display = "block";
            htmlElement.src = "btns/herstart.png";
            htmlElement.onclick = herstartKnop;
        }
    } 
    

    function showDuck(src) {
        const duckImage = document.querySelector(`.eend[src="${src}"]`);
        if (duckImage) {
            duckImage.style.display = "block";
        }
    }

    function decreaseHealth() {
        if (health < 100) {
            health -= 3; 
            if (health < 0) health = 0; //zorgt dat bij health van 0, het 0 blijft
            progressVoedingBar.value = health;
            veranderingDuckImage();
            veranderingVoerKnop();
        }
    }

    function herstartKnop() {
        health = 0; 
        progressVoedingBar.value = health; 
        veranderingDuckImage(); // Veranderd de eenden img
        veranderingVoerKnop(); // Veranderd de knoppen
    }

    // Health gaat 3 omhoog elke 900 milliseconds
    setInterval(decreaseHealth, 900);

    // Event listener naar de voerknop om 3 health omhoog te krijgen per klik
    function voerKnop() {
        health += 3;
        if (health > 100) health = 100; //
        progressVoedingBar.value = health;
        veranderingDuckImage();
        veranderingVoerKnop();
    }

   
    // https://stackoverflow.com/questions/9419263/how-to-play-audio
    // Klikken op eend komt boze eend en kwek geluiden
    eendImages.forEach(duckImage => {
        duckImage.addEventListener('click', () => {
            audio.play(); 
            hideAllDucks();  
            bozeEend.style.display = "block"; 
        });
    });
    
    htmlElement.onclick = voerKnop;

    veranderingDuckImage();
    veranderingVoerKnop();
});


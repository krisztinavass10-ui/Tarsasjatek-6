const cardImageNames = [
    "3beadf0e5bd8e6bbaadc49e93e543ca8.jpg",
    "4c75a627840fa3cf1c714454fcf4e173.jpg",
    "023f41abf90d523b5341ea6dc1177533.jpg",
    "045d53d92051eda96e4115f73a5931f1.jpg",
    "45a4a47aaeeced3432e0869fb374f460.jpg",
    "0779fbbf1a5dabc026973d22d2f65d15.jpg"
];

const questions = {
    felelsz: [
        "Mi volt a legkínosabb pillanatod az iskolában?",
        "Ki a titkos szerelmed?",
        "Mikor sírtál utoljára?"
    ],
    merszek: [
        "Énekelj el egy dalt hangosan!",
        "Csinálj 10 fekvőtámaszt!",
        "Hívd fel valakit és vallj szerelmet!"
    ],
    csokhazassag: [
        "Csók, házasság vagy halál: válassz a jelenlévők közül!",
        "Csók, házasság vagy halál: hírességek verzió"
    ],
    mostlikely: [
        "Ki valószínűbb, hogy híres lesz?",
        "Ki valószínűbb, hogy késik a saját esküvőjéről?"
    ],
    inkabb: [
        "Inkább lennél láthatatlan vagy tudnál repülni?",
        "Inkább élnél a múltban vagy a jövőben?"
    ],
    mutasdmeg: [
        "Mutasd meg az utolsó keresésed!",
        "Mutasd meg az utolsó képed!",
        "Mutasd meg az utolsó üzeneted!"
    ],
    tortenelem: {
        "Sopron": ["Mi volt Sopron fő nevezetessége?", "Mikor alapították Sopront?"],
        "Kecskemét": ["Melyik híres szülöttje Kecskemétnek?", "Milyen nevezetességek vannak itt?"],
        "Békéscsaba": ["Békéscsaba ismert eseményei?", "Mikor alapították a várost?"]
    }
};

let hasFlipped = false;

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function chooseDifficulty(category) {
    const diffContainer = document.getElementById("difficulty-container");
    const questionsContainer = document.getElementById("questions-container");
    diffContainer.innerHTML = "";
    questionsContainer.innerHTML = "";
    hasFlipped = false;

    if(category === "tortenelem") return; // Történelemhez nincs Egyszerű/Rizikós gomb

    ["Egyszerű", "Rizikós"].forEach(level => {
        const btn = document.createElement("button");
        btn.className = "category-btn difficulty-btn";
        btn.innerText = level;
        btn.addEventListener("click", () => showQuestions(category));
        diffContainer.appendChild(btn);
    });
}

function showQuestions(category, location = null) {
    const container = document.getElementById("questions-container");
    container.innerHTML = "";
    hasFlipped = false;

    const usedImages = [];
    while (usedImages.length < 6) {
        const imgName = getRandomItem(cardImageNames);
        if (!usedImages.includes(imgName)) usedImages.push(imgName);
    }

    usedImages.forEach(imgName => {
        const card = document.createElement("div");
        card.className = "card";

        const front = document.createElement("div");
        front.className = "front";
        const img = document.createElement("img");
        img.src = "images/" + imgName;
        img.alt = "Kártya hátlap";
        front.appendChild(img);

        const back = document.createElement("div");
        back.className = "back";

        if(category === "tortenelem") {
            back.innerText = getRandomItem(questions[category][location]);
        } else {
            back.innerText = getRandomItem(questions[category]);
        }

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener("click", () => {
            if(!hasFlipped){
                hasFlipped = true;
                card.classList.add("flipped");
                setTimeout(() => {
                    card.classList.remove("flipped");
                    showQuestions(category, location);
                }, 3000);
            }
        });

        container.appendChild(card);
    });
}

function showTortenelemLocations() {
    const container = document.getElementById("questions-container");
    container.innerHTML = "";

    Object.keys(questions.tortenelem).forEach(location => {
        const btn = document.createElement("button");
        btn.className = "category-btn sub-category";
        btn.innerText = location.replace(/_/g, " ");
        btn.addEventListener("click", () => showQuestions("tortenelem", location));
        container.appendChild(btn);
    });
}

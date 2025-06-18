const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

const handleStart = async () => {
    console.log("start recording");
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
    console.log(stream);
    preview.srcObject = stream;
    preview.play();
};

startBtn.addEventListener("click", handleStart);
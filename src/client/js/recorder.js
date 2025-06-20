const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");


let stream;

const handleStop = () => {
    startBtn.innerText = "Start Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        console.log("recording done");
        console.log(e);
        console.log(e.data);
    };
    console.log(recorder);
    recorder.start();
    console.log(recorder);
    setTimeout(() => {
        recorder.stop();
    }, 5000);
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    });
    console.log(stream);
    preview.srcObject = stream;
    preview.play();
};

init();

startBtn.addEventListener("click", handleStart);
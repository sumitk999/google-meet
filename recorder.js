var stopped = false;
var shouldStop = false;
var mediaRecorder = null;
var UploadID = "";
var KeyResponse = "";

// let base_url = "https://8b3d-49-249-44-114.in.ngrok.io";
let base_url = "http://localhost:3000";
let Mnumber = "000011112222"
const handleRecordOriginal = function ({ stream, mimeType }) {
  startTime = Date.now();
  var part_count = 1;
  let i = 0;
  console.log("Handle Record Original");

  // to collect stream chunks
  let recordedChunks = [];
  stopped = false;
  if (mediaRecorder == null) mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = function (e) {
    console.log(" Data Availaible");
    if (e.data.size > 0) {
      console.log("Data Recording Started");

      //API To Be Invoked Here Which Accepts This Chunk As Form Data
      let formdata = new FormData();
      formdata.append("file", e.data);
      
       async function chunkUpload(PARTCOUNT) {
        console.log("form Data>>>>>>>> ",formdata);
        const response = await fetch(
          `${base_url}/multipart/upload-part?key=${KeyResponse}&upload_id=${UploadID}&part_count=${PARTCOUNT}`,
          {
            //Request Options for Part Data Upload
            method: "POST",
            body: formdata,
            redirect: "follow",
            mode: "no-cors",
          }
        );
        return response;
      }

      chunkUpload(part_count).then((res) => {
        console.log("Blob sent");
        console.log(res);
      });

     
      recordedChunks.push(e.data);
      console.log(recordedChunks);
      part_count++;
    }
  };
  mediaRecorder.onstop = function () {
    console.log("STOPPED");
    //Data to send
    async function finalCall(url = "") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        key: KeyResponse,
        upload_id: UploadID,
      });
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: raw,
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return response.json();
    }
    // Calling the API Function
    setTimeout(() => {
      finalCall(`${base_url}/multipart/complete-multi-part`).then((data) => {
        console.log("Final Data", data);
      });
    }, 5000);
  };
  mediaRecorder.start(120000); // here 200ms is interval of chunk collection
};
//Record Screen
async function recordScreen() {
  //alert("hi....");
  console.log("Recording");
  const mimeType = "video/webm";
  shouldStop = false;
  const constraints = {
    video: true,
  };
  console.log("Before POP UP");
  const displayStream = await navigator.mediaDevices.getDisplayMedia({
    // preferCurrentTab: true,
    video: true,
    audio: true,
  });
  console.log("After POP up");
//     voiceStream for recording voice with screen recording
  const voiceStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  console.log("Voice Stream", voiceStream);
  let tracks = [
    ...displayStream.getTracks(),
    ...voiceStream.getAudioTracks(),
  ];
  console.log("Tracks", tracks);
  const stream = new MediaStream(tracks);
  handleRecordOriginal({ stream, mimeType });
}
//Stop Recording
const stopRecording = () => {
  console.log("Triggered Stop Recording");
  mediaRecorder.stop();
};


 //First API CALL For upload Id
    //Data to send
    async function getUploadID(url = "") {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return response.json();
    }
    // Calling the API Function
    console.log("Meeting Number", Mnumber);
    getUploadID(
      `${base_url}/multipart/create-multipart-upload?key=${Mnumber}`
    ).then((data) => {
      console.log("Response Data", data);
      UploadID = data.UploadId;
      KeyResponse = data.Key;
      console.log("Upload ID", UploadID);
      console.log("Key", KeyResponse);
    });


    setTimeout(()=>{
 stopRecording()
    },390000)

    
    // //Recording
    recordScreen();
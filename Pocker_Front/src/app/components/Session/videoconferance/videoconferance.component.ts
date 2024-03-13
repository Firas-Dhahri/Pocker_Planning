import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videoconferance',
  templateUrl: './videoconferance.component.html',
  styleUrls: ['./videoconferance.component.css']
})
export class VideoconferanceComponent implements OnInit {
  roomName = "NewVideoAdded";
  hostName = "wiem.khedri50@gmail.com";
  mediaStream!: MediaStream;
  jitsiMeetUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    // Request access to the user's microphone and camera
    /*   navigator.mediaDevices.getUserMedia({ audio: true, video: true })
         .then((stream) => {
           this.mediaStream = stream;
           // Generate Jitsi Meet URL with audio and video parameters
           this.jitsiMeetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
             `https://meet.jit.si/${this.roomName}?host=${this.hostName}&config.startWithAudioMuted=false&config.startWithVideoMuted=false`
           );
         })
         .catch((error) => {
           console.error('Error accessing media devices:', error);
         });
     }*/
  }
}

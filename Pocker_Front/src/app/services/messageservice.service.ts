import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  recognition = new webkitSpeechRecognition();

  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: string = '';

  currentLanguages: string[] = ['en-US', 'fr-FR'];

  constructor() {}

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = this.currentLanguages;

    this.recognition.addEventListener('result', (e:any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  startService(){
    this.text = '';

    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', this.handleRecognitionEnd);
  }

  stopService() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.removeEventListener('end', this.handleRecognitionEnd); // Remove the 'end' event listener
    this.recognition.stop();
    console.log("End speech recognition")
  }

  private handleRecognitionEnd = (condition: any) => {
    if (this.isStoppedSpeechRecog) {
      this.recognition.stop();
      console.log("End speech recognition")
    } else {
      this.wordConcat()
      this.recognition.start();
    }
  };

  wordConcat(){
    if (this.text.trim() !== '') {
      this.text = this.text + ', ' + this.tempWords;
    } else {
      this.text = this.tempWords.charAt(0).toUpperCase() + this.tempWords.slice(1);
    }
    this.tempWords = '';
  }

}

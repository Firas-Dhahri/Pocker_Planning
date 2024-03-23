import {EventEmitter, Injectable} from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  recognition = new webkitSpeechRecognition();

  isStoppedSpeechRecog = false;
  public text = '';
  tempWords: string = '';

  recordingFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

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
    this.recognition.removeEventListener('end', this.handleRecognitionEnd);
    this.recognition.stop();
    console.log("End speech recognition")
  }

  private handleRecognitionEnd = () => {
    if (this.isStoppedSpeechRecog) {
      this.recognition.stop();
      console.log("End speech recognition");
    } else {
      this.wordConcat();
      this.recognition.start();
    }

    this.recordingFinished.emit(this.text);
  };

  wordConcat(){
    if (this.text.trim() !== '') {
      this.text = this.text + ', ' + this.tempWords;
    } else {
      this.text = this.tempWords.charAt(0).toUpperCase() + this.tempWords.slice(1);
    }
    this.tempWords = '';
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }

}

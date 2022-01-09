import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';
import {ILanguageSwitch} from "./Language";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'OCR Angular Image Tesseract Test';
  number = '';
  responseMessage = '';
  img: any;
  isLoading = false;
  language = 'eng';
  languageSwitch: ILanguageSwitch[] = [
    {name: 'English', value: 'eng'},
    {name: 'Deutsch', value: 'deu'}
  ]

  async addedFile(event: Event) {
    // @ts-ignore
    this.img = event?.target?.files[0];
  }

  async doOCR() {
    this.isLoading = true;
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage(this.language);
    await worker.initialize(this.language);
    const { data: { text } } = await worker.recognize(this.img);
    this.responseMessage = text;
    console.log(text);
    await worker.terminate().then(() => {
      this.isLoading = false;
    });
  }
}

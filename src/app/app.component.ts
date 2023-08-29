import { Component } from '@angular/core';
import { Parser } from '@dxfjs/parser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  parser: Parser = new Parser();
  private fileContent: string | null = null;

  fileChanged(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result as string;
    };

    reader.readAsText(file);
  }

  parseUploadedDxf() {
    if (!this.fileContent) {
      console.error('No file content available for parsing.');
      return;
    }

    this.parser
      .parse(this.fileContent)
      .then((obj) => {
        console.log(obj);
        // Weitere Logik hier
      })
      .catch((error) => console.error("hier"+error));
  }

}

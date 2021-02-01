import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ShortenAPIService } from '../../services/shorten-api.service';
import { shortcode } from 'src/shared/shortcode';
// import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shortify',
  templateUrl: './shortify.component.html',
  styleUrls: ['./shortify.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('void => *', [animate('1000ms ease-in')]),
      transition('* => void', [animate('600ms ease-out')]),
    ]),
  ],
})
export class ShortifyComponent implements OnInit {
  url: string = '';
  urlLink: string;
  err: boolean = false;
  Links = [];
  urlData: shortcode;
  errMessage: string;
  showSpinner: boolean = false;
  isCopied: string = '';
  inputErr: string = '';

  constructor(private shortenApiService: ShortenAPIService) {}

  ngOnInit(): void {
    this.Links = JSON.parse(localStorage.getItem('storedLinks'));
  }

  // Function to process url shortening request
  onSubmit() {
    // if inputs value is null show red warning
    if (this.url === '') {
      this.err = true;
      this.inputErr = 'hsl(0, 87%, 67%)';

      setTimeout(() => {
        this.err = false;
        this.inputErr = '';
      }, 3000);
    } else {
      this.showSpinner = true;

      this.urlLink = this.url;
      this.shortenApiService.getLink(this.urlLink).subscribe(
        (res) => {
          this.showSpinner = false;

          // If there is nothing saved on init, save empty array
          if (localStorage.getItem('storedLinks') == null) {
            localStorage.setItem('storedLinks', '[]');
          }

          // get old data
          this.Links = JSON.parse(localStorage.getItem('storedLinks'));

          //if links are less than 3 add new link into the Link arry, else shift the first item in the array if items are more than 3
          if (this.Links.length < 3) {
            this.Links.push(res.result);
          } else {
            this.Links.shift();
            this.Links.push(res.result);
          }

          // Save the updated links array to localstorage
          localStorage.setItem('storedLinks', JSON.stringify(this.Links));
        },
        (errMess) => {
          this.showSpinner = false;
          this.errMessage = <any>errMess;
          setTimeout(() => {
            this.errMessage = null;
          }, 3000);
        }
      );

      setTimeout(() => {
        this.url = '';
      }, 3000);
    }
  }

  // Click function to change copy style and text
  clickedLink;
  onClick(i) {
    this.clickedLink = this.Links[i];
    setTimeout(() => {
      this.clickedLink = null;
    }, 5000);
  }
}

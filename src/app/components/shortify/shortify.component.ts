import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ShortenAPIService } from '../../services/shorten-api.service';
import { shortcode } from 'src/shared/shortcode';
// import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shortify',
  templateUrl: './shortify.component.html',
  styleUrls: ['./shortify.component.scss'],
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
  copyState: string = 'Copy';
  isErr: boolean = false;
  StoredLinks = [];

  constructor(private shortenApiService: ShortenAPIService) {}

  ngOnInit(): void {
    localStorage.setItem('storedLinks', JSON.stringify(this.Links));

    this.StoredLinks = JSON.parse(localStorage.getItem('storedLinks'));
    console.log(this.Links);
  }

  onSubmit() {
    if (this.url === '') {
      this.err = true;
      setTimeout(() => {
        this.err = false;
      }, 3000);
    } else {
      this.showSpinner = true;

      this.urlLink = this.url;
      this.shortenApiService.getLink(this.urlLink).subscribe(
        (res) => {
          this.Links.push(res.result);
          this.showSpinner = false;
          // localStorage.setItem('storedLinks', JSON.stringify(res.result));
        },
        (errMess) => {
          this.showSpinner = false;
          // this.Links = null;
          this.errMessage = <any>errMess;
          setTimeout(() => {
            this.errMessage = null;
          }, 3000);
        }
      );

      if (this.Links.length > 2) {
        this.Links.shift();
      }

      setTimeout(() => {
        this.url = '';
      }, 3000);
    }
  }

  onClick() {
    this.copyState = 'Copied!';
    this.isCopied = 'hsl(258, 40%, 30%)';

    setTimeout(() => {
      this.copyState = 'Copy';
      this.isCopied = '';
    }, 5000);

    if (this.err === true) {
      this.isErr = true;
    }
  }
}

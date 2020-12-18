import { Component, OnInit } from '@angular/core';
import {
  faTwitter,
  faPinterest,
  faInstagram,
  faFacebookSquare,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebookSquare;
  faTwitter = faTwitter;
  faPinterest = faPinterest;
  faInstagram = faInstagram;

  constructor() {}

  ngOnInit(): void {}
}

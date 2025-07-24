import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './service-details.html',
  styleUrls: ['./service-details.css'],
})
export class ServiceDetails {
  faqs = [
    {
      question: 'What is included in a Classic Cut?',
      answer:
        'The Classic Cut includes a consultation with your barber, a haircut tailored to your style, and final styling with product. It does not include a hair wash or beard trim.',
      open: false,
    },
    {
      question: 'Do you offer services for children?',
      answer:
        'Yes, we offer specialized services for children with experienced staff.',
      open: false,
    },
    {
      question:
        'What is the difference between a Hot Towel Shave and a regular shave?',
      answer:
        'A Hot Towel Shave includes pre-treatment with hot towels to soften the hair and open pores.',
      open: false,
    },
    {
      question: 'Can I get a haircut and beard trim together?',
      answer:
        'Yes, we offer combination packages for haircut and beard trim services.',
      open: false,
    },
  ];

  reviews = [
    {
      avatar: 'assets/images/img_img_25.png',
      name: 'Adrian Hendriques',
      date: '2 days ago • Excellent service!',
      comment: 'Excellent service!',
      rating: 5,
      text: 'The electricians were prompt, professional, and resolved our issues quickly. Did a fantastic job upgrading our electrical panel. Highly recommend them for any electrical work.',
      likes: 45,
      dislikes: 21,
    },
    {
      avatar: 'assets/images/img_img_27.png',
      name: 'Don Rosales',
      date: '2 days ago • Great Service!',
      comment: 'Great Service!',
      rating: 1,
      text: 'The quality of work was exceptional, and they left the site clean and tidy. I was impressed by their attention to detail and commitment to safety standards. Highly recommend their services!',
      likes: 15,
      dislikes: 1,
    },
    {
      avatar: 'assets/images/img_img_28.png',
      name: 'Paul Bronk',
      date: '2 days ago • Reliable and Trustworthy!',
      comment: 'Reliable and Trustworthy!',
      rating: 1,
      text: 'The quality of work was exceptional, and they left the site clean and tidy. I was impressed by their attention to detail and commitment to safety standards. Highly recommend their services!',
      likes: 10,
      dislikes: 2,
    },
  ];

  toggleFaq(index: number) {
    this.faqs.forEach((faq, i) => {
      faq.open = i === index ? !faq.open : false;
    });
  }
}

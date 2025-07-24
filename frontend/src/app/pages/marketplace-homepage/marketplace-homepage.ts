import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-marketplace-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './marketplace-homepage.html',
  styleUrls: ['./marketplace-homepage.css'],
})
export class MarketplaceHomepage {
  searchService: string = '';
  searchLocation: string = '';
  activeTab: number = 0;
  activeHighRatedTab: number = 0;

  categories = [
    {
      icon: 'assets/images/img_clip_path_group.svg',
      name: 'Construction',
      listings: 9874,
      isNew: false,
    },
    {
      icon: 'assets/images/img_category_02_svg.svg',
      name: 'Removals',
      listings: 787,
      isNew: false,
    },
    {
      icon: 'assets/images/img_category_13_svg.svg',
      name: 'Cleaning',
      listings: 2357,
      isNew: false,
    },
    {
      icon: 'assets/images/img_clip_path_group_black_900.svg',
      name: 'Deliveries',
      listings: 4547,
      isNew: false,
    },
    {
      icon: 'assets/images/img_category_08_svg.svg',
      name: 'Mobile Barber',
      listings: 4787,
      isNew: true,
    },
    {
      icon: 'assets/images/img_clip_path_group_black_900_40x40.svg',
      name: 'Interior',
      listings: 1457,
      isNew: false,
    },
    {
      icon: 'assets/images/img_clip_path_group_40x40.svg',
      name: 'Computer Service',
      listings: 1260,
      isNew: false,
    },
    {
      icon: 'assets/images/img_category_05_svg.svg',
      name: 'Electrical',
      listings: 4546,
      isNew: false,
    },
    {
      icon: 'assets/images/img_clip_path_group_2.svg',
      name: 'Man & Van',
      listings: 2546,
      isNew: false,
    },
    {
      icon: 'assets/images/img_clip_path_group_1.svg',
      name: 'Plumbing',
      listings: 4157,
      isNew: false,
    },
    {
      icon: 'assets/images/img_clip_path_group_3.svg',
      name: 'Nail Technicians',
      listings: 5477,
      isNew: false,
    },
    {
      icon: 'assets/images/img_clip_path_group_4.svg',
      name: 'Hair Dressers',
      listings: 7457,
      isNew: false,
    },
  ];

  featuredServices = [
    {
      image: 'assets/images/img_link_img.png',
      title: 'Professional Delivery Services',
      price: '$40',
      rating: 4.5,
    },
    {
      image: 'assets/images/img_link_img_334x416.png',
      title: 'Classic Manicure & Set of Nails',
      price: '$20',
      rating: 4.4,
    },
    {
      image: 'assets/images/img_link_img_1.png',
      title: 'Water Heater Installation',
      price: '$65',
      rating: 4.2,
    },
  ];

  serviceTabs = [
    'Computer Service',
    'Removals',
    'Man & Van',
    'Furniture Assembly',
    'Electrical',
    'Construction',
    'Plumbing',
    'More Services',
  ];

  popularServices = [
    {
      image: 'assets/images/img_link_img_244x306.png',
      title: 'Backup & Recovery',
      rating: 4.5,
      reviews: 254,
      price: '$350',
    },
    {
      image: 'assets/images/img_link_img_246x306.png',
      title: 'Repairs & Upgrades',
      rating: 4.2,
      reviews: 120,
      price: '$150',
    },
    {
      image: 'assets/images/img_link_img_2.png',
      title: 'Setup & Configuration',
      rating: 4.4,
      reviews: 300,
      price: '$200',
    },
    {
      image: 'assets/images/img_link_img_3.png',
      title: 'Troubleshooting & Diagnostics',
      rating: 4.7,
      reviews: 280,
      price: '$250',
    },
  ];

  steps = [
    {
      icon: 'assets/images/img_work_01_svg.svg',
      title: '1. Post a Service',
      description:
        'After you post a job, our matching system identifies and alerts relevant Provider, who can then express interest in your job.',
    },
    {
      icon: 'assets/images/img_work_01_svg.svg',
      title: '2. Getting Booked & Job done',
      description:
        'After you post a job, our matching system identifies and alerts relevant Provider, who can then express interest in your job.',
    },
    {
      icon: 'assets/images/img_work_03_svg.svg',
      title: '3. Get Reviewd & Get Leads',
      description:
        'After you post a job, our matching system identifies and alerts relevant Provider, who can then express interest in your job.',
    },
  ];

  preferredServices = [
    {
      providerAvatar: 'assets/images/img_img_24x24.png',
      providerName: 'Trivala Anderson',
      price: '$350',
      title: 'Cabinet Installation',
      rating: 4.5,
      reviews: 254,
      bookings: '3K',
    },
    {
      providerAvatar: 'assets/images/img_img_1.png',
      providerName: 'William Tichenor',
      price: '$350',
      title: 'Express Car Wash',
      rating: 4.6,
      reviews: 214,
      bookings: '2K',
    },
    {
      providerAvatar: 'assets/images/img_img_2.png',
      providerName: 'Edwin Murphy',
      price: '$280',
      title: 'Haircut and Styling',
      rating: 4.7,
      reviews: 230,
      bookings: '2K',
    },
  ];

  popularProviders = [
    {
      avatar: 'assets/images/img_img_64x64.png',
      name: 'Hendry Thompson',
      rating: 4.4,
      reviews: 123,
      servicesCount: 46,
      price: '$60',
    },
    {
      avatar: 'assets/images/img_img_3.png',
      name: 'William Patterson',
      rating: 4.8,
      reviews: 200,
      servicesCount: 40,
      price: '$70',
    },
    {
      avatar: 'assets/images/img_img_4.png',
      name: 'Lorenzo Verduzco',
      rating: 4.6,
      reviews: 270,
      servicesCount: 52,
      price: '$55',
    },
  ];

  highRatedTabs = [
    'Removals',
    'Furniture Assembly',
    'Electrical Services',
    'Construction',
    'Man & Van',
    'Plumbing',
    'More Services',
  ];

  highRatedServices = [
    {
      image: 'assets/images/img_img_210x306.png',
      title: 'Wiring and rewiring',
    },
    { image: 'assets/images/img_img_9.png', title: 'Ceiling fan installation' },
    { image: 'assets/images/img_img_10.png', title: 'Faulty wiring repair' },
    { image: 'assets/images/img_img_11.png', title: 'Light fixture repair' },
  ];

  customerReviews = [
    {
      avatar: 'assets/images/img_img_44x44.png',
      title: 'Quality of work was excellent',
      text: 'I had a great experience with ABC Electrical on the Services. The electrician arrived on time!!!',
      name: 'Robert Anderson',
      date: '2 Days Ago',
    },
    {
      avatar: 'assets/images/img_img_12.png',
      title: 'Green Cleaning',
      text: 'I love that they use eco-friendly products without compromising on cleanliness with care.',
      name: 'Delois Coffin',
      date: '3 Days Ago',
    },
    {
      avatar: 'assets/images/img_img_13.png',
      title: 'Luxury Car Cleaning',
      text: 'Exceptional care for my luxury vehicle. The team treated my car with precision and care.',
      name: 'Matthew Hicks',
      date: '5 Days Ago',
    },
  ];

  selectTab(index: number) {
    this.activeTab = index;
  }

  selectHighRatedTab(index: number) {
    this.activeHighRatedTab = index;
  }

  onSearch() {
    if (this.searchService && this.searchLocation) {
      alert(`Searching for ${this.searchService} in ${this.searchLocation}`);
    } else {
      alert('Please enter both service and location');
    }
  }
}

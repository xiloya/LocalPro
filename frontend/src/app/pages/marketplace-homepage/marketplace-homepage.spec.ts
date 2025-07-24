import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceHomepage } from './marketplace-homepage';

describe('MarketplaceHomepage', () => {
  let component: MarketplaceHomepage;
  let fixture: ComponentFixture<MarketplaceHomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketplaceHomepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketplaceHomepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

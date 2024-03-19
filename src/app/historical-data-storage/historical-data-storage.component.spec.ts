import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDataStorageComponent } from './historical-data-storage.component';

describe('PriceStorageComponent', () => {
  let component: HistoricalDataStorageComponent;
  let fixture: ComponentFixture<HistoricalDataStorageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalDataStorageComponent]
    });
    fixture = TestBed.createComponent(HistoricalDataStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

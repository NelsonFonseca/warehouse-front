import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailWarehouseComponent } from './detail-warehouse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ConsumeService } from '../../services/consume.service';

describe('DetailWarehouseComponent', () => {
  let component: DetailWarehouseComponent;
  let fixture: ComponentFixture<DetailWarehouseComponent>;
  let mockService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockService = {
      getOne: jest.fn().mockReturnValue(of({
        uuid: '123',
        client: 'Test Client',
        family: 'ROB',
        size: 'Large'
      })),
      getList: jest.fn().mockReturnValue(of([])),
      update: jest.fn().mockReturnValue(of({})),
      create: jest.fn().mockReturnValue(of({})),
      delete: jest.fn().mockReturnValue(of({}))
    };

    mockRouter = {
      getCurrentNavigation: jest.fn().mockReturnValue({
        extras: {
          state: {
            id: '123',
            option: 'edit'
          }
        }
      })
    };

    await TestBed.configureTestingModule({
      declarations: [DetailWarehouseComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ConsumeService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should initialize form with data from service', () => {
    expect(component.form.get('client')?.value).toBe('Test Client');
    expect(component.rackType).toEqual(['A', 'C', 'D']);
  }); */

  it('should call updateWarehouseData on valid form submit', () => {
    component.form.enable();
    component.form.setValue({
      uuid: '123',
      client: 'Updated Client',
      family: 'ROB',
      size: 'Medium'
    });

    component.onSubmit();
    expect(mockService.update).toHaveBeenCalled();
  });

  it('should call createRacks on valid rack form submit', () => {
    component.formRack.setValue({
      uuid: 'rack-1',
      type: 'A',
      warehouse: '123'
    });

    component.onSubmitRack();
    expect(mockService.create).toHaveBeenCalled();
  });

  it('should reset formRack on cancel', () => {
    component.formRack.setValue({
      uuid: 'rack-1',
      type: 'A',
      warehouse: '123'
    });
    component.cancel();
    expect(component.formRack.value.uuid).toBeNull();
  });

  it('should update rackType when family is changed to ROB', () => {
    component.changeData({ value: 'ROB' });
    expect(component.rackType).toEqual(['A', 'C', 'D']);
  });

  it('should update rackType when family is changed to EST', () => {
    component.changeData({ value: 'EST' });
    expect(component.rackType).toEqual(['A', 'B', 'C']);
  });
});

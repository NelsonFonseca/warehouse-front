import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWarehouseComponent } from './table-warehouse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ConsumeService } from '../../services/consume.service';

describe('TableWarehouseComponent', () => {
  let component: TableWarehouseComponent;
  let fixture: ComponentFixture<TableWarehouseComponent>;
  let mockService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockService = {
      getList: jest.fn().mockReturnValue(of([])),
      create: jest.fn().mockReturnValue(of({})),
      delete: jest.fn().mockReturnValue(of({})),
      calculatePermutations: jest.fn().mockReturnValue(of(['perm1', 'perm2']))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [TableWarehouseComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ConsumeService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and families', () => {
    expect(component.families).toEqual(['EST', 'ROB']);
    expect(component.formulario).toBeDefined();
    expect(component.formPermutation).toBeDefined();
  });

  it('should call getWarehouses on init', () => {
    expect(mockService.getList).toHaveBeenCalledWith('/warehouses');
  });

  it('should call createWarehouses on valid form submit', () => {
    const formValue = {
      uuid: '123',
      client: 'Test Client',
      family: 'EST',
      size: 'Large'
    };
  
    component.formulario.setValue(formValue);
  
    component.onSubmit();
  
    expect(mockService.create).toHaveBeenCalledWith('/warehouses', formValue);
  });  

  it('should not submit if form is invalid', () => {
    component.formulario.setValue({
      uuid: '',
      client: '',
      family: '',
      size: ''
    });

    component.onSubmit();
    expect(mockService.create).not.toHaveBeenCalled();
  });

  it('should call deleteWarehouses', () => {
    component.deleteWarehouses(1);
    expect(mockService.delete).toHaveBeenCalledWith('/warehouses', 1);
  });

  it('should navigate to detail with correct state', () => {
    component.goDetail('123', 'edit');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail'], {
      state: { id: '123', option: 'edit' }
    });
  });

  it('should calculate permutations on valid form', () => {
    component.formPermutation.setValue({
      size: 'Large',
      family: 'ROB'
    });

    component.calculatePermutation();
    expect(mockService.calculatePermutations).toHaveBeenCalledWith('/permutations', 'ROB', 'Large');
  });

  it('should not calculate permutations if form is invalid', () => {
    component.formPermutation.setValue({
      size: '',
      family: ''
    });

    component.calculatePermutation();
    expect(mockService.calculatePermutations).not.toHaveBeenCalled();
  });

  it('should reset form and hide modal on cancel', () => {
    component.visible = true;
    component.formulario.setValue({
      uuid: '123',
      client: 'Test',
      family: 'EST',
      size: 'Large'
    });

    component.cancel();
    expect(component.formulario.value.uuid).toBeNull();
    expect(component.visible).toBe(false);
  });
});

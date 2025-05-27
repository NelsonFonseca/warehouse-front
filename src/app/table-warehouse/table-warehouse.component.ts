import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumeService } from '../../services/consume.service';

@Component({
  selector: 'app-table-warehouse',
  templateUrl: './table-warehouse.component.html',
  styleUrls: ['./table-warehouse.component.scss']
})
export class TableWarehouseComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private service : ConsumeService) { }

  warehouses: any[] = [];
  families: any[] = [];
  permitations: any[] = [];
  visible: boolean = false;

  formulario!: FormGroup;
  formPermutation! : FormGroup;

  ngOnInit() {
    this.getWarehouses();

    this.families = ["EST", "ROB"];

      
    this.formulario = this.fb.group({
      uuid: ['', Validators.required],
      client: ['', [Validators.required, Validators.minLength(3)]],
      family: ['', Validators.required],
      size: ['', Validators.required]
    });

    this.formPermutation = this.fb.group({
      size: ['', Validators.required],
      family: ['', Validators.required],
    });

  }

  getWarehouses(){
    this.service.getList('/warehouses').subscribe(res => {
      this.warehouses = res as [];
    });
  }

  createWarehouses(body: any){
    this.service.create('/warehouses', body).subscribe(res => {
      this.getWarehouses();
    });
  }

  deleteWarehouses(id: number){
    this.service.delete('/warehouses', id).subscribe(res => {
      this.getWarehouses();
    });
  }

  goDetail(id: string, option: string){
    
    this.router.navigate(['/detail'], {
      state: { id: id, option: option }
    });
  
  }
  
  onSubmit() {
    if (this.formulario.valid) {
      this.createWarehouses(this.formulario.value);
      this.cancel();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
    
  cancel() {
    this.formulario.reset();
    this.visible = false;
  }

  calculatePermutation(){
    if (this.formPermutation.valid) {
      this.service.calculatePermutations('/permutations', this.formPermutation.value.family, this.formPermutation.value.size).subscribe(res => {
        this.permitations = res as [];
        this.formPermutation.reset();
      });
    } else {
      this.formPermutation.markAllAsTouched();
    }
  }
    

}

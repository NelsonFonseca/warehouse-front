import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-warehouse',
  templateUrl: './table-warehouse.component.html',
  styleUrls: ['./table-warehouse.component.scss']
})
export class TableWarehouseComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder) { }

  products: any[] = [];
  families: any[] = [];
  visible: boolean = false;

  formulario!: FormGroup;

  ngOnInit() {
    this.products = [
      {"id": "123", "uuid": "name1", "client": "client2", "family": "family1", "size": "size1"},
      {"id": "321", "uuid": "name2", "client": "client2", "family": "family2", "size": "size2"}
    ];

    this.families = ["EST", "ROB"];

      
    this.formulario = this.fb.group({
      uuid: ['', Validators.required],
      client: ['', [Validators.required, Validators.minLength(3)]],
      family: ['', Validators.required],
      size: ['', Validators.required]
    });

  }

  goDetail(id: string, option: string){
    
    this.router.navigate(['/detail'], {
      state: { id: id, option: option }
    });
  
  }
  
  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulario enviado:', this.formulario.value);
      this.cancel();
    } else {
      this.formulario.markAllAsTouched();
    }
  }
    
  cancel() {
    this.formulario.reset();
    this.visible = false;
  }
    

}

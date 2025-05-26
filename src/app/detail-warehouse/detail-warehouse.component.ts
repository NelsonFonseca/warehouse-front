import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-warehouse',
  templateUrl: './detail-warehouse.component.html',
  styleUrls: ['./detail-warehouse.component.scss']
})
export class DetailWarehouseComponent implements OnInit {

  dataId: string = '';
  option: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.dataId = state?.['id'];
    console.log(state?.['id'], state?.['option']);
    if(state?.['option'] == 'edit'){
      this.option = true;
    }
  }

  products: any[] = [];
  families: any[] = [];
  rackType: any[] = [];
  visible: boolean = false;
  form!: FormGroup;
  formRack!: FormGroup;

  ngOnInit() {
    this.products = [
      {"id": "123", "uuid": "name1", "type": "client2", "family": "family1", "size": "size1"},
      {"id": "321", "uuid": "name2", "type": "client2", "family": "family2", "size": "size2"}
    ];

    this.families = ["EST", "ROB"];
    this.rackType = ["A", "B", "C", "D"];
      
    this.form = this.fb.group({
      uuid: [{value: '', disabled: true}, Validators.required],
      client: [{value: '', disabled: !this.option}, [Validators.required, Validators.minLength(3)]],
      family: [{value: '', disabled: !this.option}, Validators.required],
      size: [{value: '', disabled: !this.option}, Validators.required]
    });

    this.formRack = this.fb.group({
      uuid: ['', Validators.required],
      type: ['', [Validators.required]],
    });

  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      this.visible = false;
    } else {
      this.form.markAllAsTouched();
    }
  }


  onSubmitRack() {
    if (this.formRack.valid) {
      console.log('Formulario enviado:', this.formRack.value);
      this.cancel();
    } else {
      this.formRack.markAllAsTouched();
    }
  }
    
  cancel() {
    this.formRack.reset();
    this.visible = false;
  }
}

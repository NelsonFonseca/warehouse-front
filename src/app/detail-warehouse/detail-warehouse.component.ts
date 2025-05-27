import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsumeService } from '../../services/consume.service';

@Component({
  selector: 'app-detail-warehouse',
  templateUrl: './detail-warehouse.component.html',
  styleUrls: ['./detail-warehouse.component.scss']
})
export class DetailWarehouseComponent implements OnInit {

  dataId: string = '';
  option: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private service : ConsumeService) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    this.dataId = state?.['id'];
    if(state?.['option'] == 'edit'){
      this.option = true;
    }
  }

  rasks: any[] = [];
  families: any[] = [];
  rackType: any[] = [];
  visible: boolean = false;
  form!: FormGroup;
  formRack!: FormGroup;

  ngOnInit() {
    this.getWarehouseData();
    this.getRacks();

    this.families = ["EST", "ROB"];
    this.rackType = ["A", "B", "C"];
      
    this.form = this.fb.group({
      uuid: [{value: '', disabled: true}],
      client: [{value: '', disabled: !this.option}, [Validators.required, Validators.minLength(3)]],
      family: [{value: '', disabled: !this.option}, Validators.required],
      size: [{value: '', disabled: !this.option}, Validators.required]
    });

    this.formRack = this.fb.group({
      uuid: ['', Validators.required],
      type: ['', [Validators.required]],
      warehouse: [this.dataId, [Validators.required]],
    });

  }

  getWarehouseData(){
    this.service.getOne('/warehouses', this.dataId as any).subscribe((res : any) => {
      if(res.family == 'ROB'){
        this.rackType = ["A", "C", "D"];
      }
      this.form = this.fb.group({
        uuid: [{value: res.uuid, disabled: true}],
        client: [{value: res.client, disabled: !this.option}, [Validators.required, Validators.minLength(3)]],
        family: [{value: res.family, disabled: !this.option}, Validators.required],
        size: [{value: res.size, disabled: !this.option}, Validators.required]
      });
    });
  }

  updateWarehouseData(body : any){
    this.service.update('/warehouses', body, this.dataId as any).subscribe((res : any) => {
      console.log(res);
    });
  }

  getRacks(){
    this.service.getList('/racks/warehouse/'+this.dataId).subscribe((res : any) => {
      this.rasks = res as [];
    });
  }

  createRacks(body : any){
    this.service.create('/racks', body).subscribe((res : any) => {
      this.getRacks();
    });
  }

  deleteRacks(id: number){
    this.service.delete('/racks', id).subscribe((res : any) => {
      this.getRacks();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.updateWarehouseData(this.form.getRawValue());
      this.visible = false;
    } else {
      this.form.markAllAsTouched();
    }
  }


  onSubmitRack() {
    if (this.formRack.valid) {
      this.createRacks(this.formRack.value);
      this.cancel();
    } else {
      this.formRack.markAllAsTouched();
    }
  }
    
  cancel() {
    this.formRack.reset();
    this.visible = false;
  }

  changeData(event : any){
    if(event.value == 'ROB'){
      this.rackType = ["A", "C", "D"];
    }else{
      this.rackType = ["A", "B", "C"];
    }
  }
}

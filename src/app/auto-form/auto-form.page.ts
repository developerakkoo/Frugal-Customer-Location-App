import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auto-form',
  templateUrl: './auto-form.page.html',
  styleUrls: ['./auto-form.page.scss'],
})
export class AutoFormPage implements OnInit {

  @Input() id!:any;

  autoForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
            private modalController: ModalController,
            private db: Database) {
              this.autoForm = this.fb.group({
                from: [, [Validators.required]],
                to:[, [Validators.required]]
              })
             }

  ngOnInit() {
    console.log(this.id);
    
  }

  dismiss(){
    this.modalController.dismiss();
  }

  onSubmit(){
    
  }

}

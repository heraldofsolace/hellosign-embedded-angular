import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import HelloSign from 'hellosign-embedded';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hellosign-client';
  ndaForm!: FormGroup;

  client: HelloSign = new HelloSign({
    clientId: '<YOUR_CLIENT_ID>',
  });

  constructor(private formBuilder: FormBuilder, private config: ConfigService) {}

  ngOnInit() {
    this.ndaForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.ndaForm.value;
    this.config
      .requestSign({ name: formData.name, email: formData.email })
      .subscribe((res) => {
        this.client.open(res.data.embedded.sign_url, {
          skipDomainVerification: true,
        });
      });

  }


}

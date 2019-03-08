import {FormBuilder, FormControl} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {CONFIGURATIONS} from './configurations.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public queryCtrl: FormControl;
  public configurations = CONFIGURATIONS;
  public currentConfig = CONFIGURATIONS[0];

  changeConfiguration(configuration) {
    this.currentConfig = configuration;
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.queryCtrl = this.formBuilder.control(this.currentConfig.query);
  }
}

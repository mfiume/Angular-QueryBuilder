import {FormBuilder, FormControl} from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';
import {CONFIGURATIONS} from './configurations.model';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public queryCtrl: FormControl;
  public configurations = CONFIGURATIONS;
  public currentConfig = CONFIGURATIONS[0];

  @ViewChild('jsonEditor')
  jsonEditor: JsonEditorComponent;

  public editorOptions = new JsonEditorOptions();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.queryCtrl = this.formBuilder.control(this.currentConfig.query);

    this.editorOptions.mode = 'tree';
    this.editorOptions.mainMenuBar = false;
    this.editorOptions.navigationBar = false;
    this.editorOptions.statusBar = false;
  }
}

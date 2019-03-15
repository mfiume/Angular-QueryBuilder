import {FormBuilder, FormControl} from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from 'ang-jsoneditor';
import { ApiService } from './app.api.service';
import { Field } from './model/search/field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public queryCtrl: FormControl;

  public query = {
    condition : 'and',
    rules : []
  };

  public config = {};

  @ViewChild('jsonEditor')
  jsonEditor: JsonEditorComponent;

  public editorOptions = new JsonEditorOptions();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.queryCtrl = this.formBuilder.control(this.query);

    this.editorOptions.mode = 'tree';
    this.editorOptions.mainMenuBar = false;
    this.editorOptions.navigationBar = false;
    this.editorOptions.statusBar = false;
  }

  updateJsonEditor($event) {
    this.jsonEditor.set($event);
  }

  normalizeArray<T>(array: Array<T>, indexKey: keyof T) {
     const normalizedObject: any = {}
     for (let i = 0; i < array.length; i++) {
          const key = array[i][indexKey]
          normalizedObject[key] = array[i]
     }
     return normalizedObject as { [key: string]: T }
   }

  ngOnInit(): void {
    if (this.jsonEditor && this.jsonEditor['editor']) {
      this.jsonEditor.set(this.query);
    }

    this.apiService
      .getFields()
      .subscribe((fields: Field[]) => {
            fields = this.normalizeArray(fields,'id');
            this.config.fields = fields;
        },
        //(dto) => this.setFields(dto),
        (err) => console.log('Error', err));
  }
}

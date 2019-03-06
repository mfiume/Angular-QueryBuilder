import { FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { QueryBuilderClassNames, QueryBuilderConfig } from 'angular2-query-builder';


@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <div class="m-s">GA4GH Discovery Search Query Builder</div>
  </mat-toolbar>
  <div class="m-a">
  <mat-form-field style="width: 400px" >
    <mat-select placeholder="Configuration" (selectionChange)="changeConfiguration($event.value)">
      <mat-option *ngFor="let configuration of configurations" [value]="configuration">
        {{ configuration.name }}
      </mat-option>
    </mat-select>
  </mat-form-field>
  <div class="pull-right">
    <button mat-raised-button color="primary">Search</button>
  </div>
  <div class="clearfix"></div>
  <mat-tab-group>
    <mat-tab label="Fields">
      <div class="m-v">
        <div class="mat-table">
          <div class="mat-header-row">
            <div class="mat-header-cell">Name</div>
            <div class="mat-header-cell">ID</div>
            <div class="mat-header-cell">Type</div>
            <div class="mat-header-cell">Options</div>
            <div class="mat-header-cell">Operators</div>
          </div>
          <div class="mat-row" *ngFor="let field of currentConfig.fields | keyvalue">
            <div class="mat-cell">{{field.value.name}}</div>
            <div class="mat-cell"><a href="{{field.value.spec}}">{{field.value.id}}</a></div>
            <div class="mat-cell">{{field.value.type}}</div>
            <div class="mat-cell">
              <div *ngFor="let option of field.value.options | keyvalue">
                {{option.value.name}}
              </div>
            </div>
            <div class="mat-cell">
              <div *ngFor="let operator of field.value.operators">
                {{operator}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </mat-tab>
    <mat-tab label="GUI">
      <div class="m-v">
        <query-builder [(ngModel)]='query' [config]='currentConfig'>
          <ng-container *queryButtonGroup="let ruleset; let addRule=addRule; let addRuleSet=addRuleSet; let removeRuleSet=removeRuleSet">
            <button type="button" matTooltip="Add Rule" mat-icon-button color="primary" (click)="addRule()">
              <mat-icon>add</mat-icon></button>
            <button type="button" matTooltip="Add Ruleset" mat-icon-button color="primary" *ngIf="addRuleSet" (click)="addRuleSet()">
              <mat-icon>add_circle_outline</mat-icon></button>
            <button type="button" mat-icon-button matTooltip="Remove Ruleset" color="accent" *ngIf="removeRuleSet" (click)="removeRuleSet()">
              <mat-icon>remove_circle_outline</mat-icon></button>
          </ng-container>
          <ng-container *queryArrowIcon>
            <mat-icon ngClass="mat-arrow-icon">chevron_right</mat-icon>
          </ng-container>
          <ng-container *queryRemoveButton="let rule; let removeRule=removeRule">
            <button type="button" mat-icon-button matTooltip="Remove Rule" color="accent" (click)="removeRule(rule)">
              <mat-icon>remove</mat-icon>
            </button>
          </ng-container>
          <ng-container *querySwitchGroup="let ruleset; let onChange=onChange">
            <mat-radio-group *ngIf="ruleset" [(ngModel)]="ruleset.condition" (ngModelChange)="onChange($event)">
              <mat-radio-button [style.padding.px]="10" value="and">And</mat-radio-button>
              <mat-radio-button [style.padding.px]="10" value="or">Or</mat-radio-button>
            </mat-radio-group>
          </ng-container>
          <ng-container *queryField="let rule; let fields=fields; let onChange=onChange; let getFields = getFields">
            <mat-form-field>
              <mat-select [(ngModel)]="rule.field" (ngModelChange)="onChange($event, rule)">
                <mat-option *ngFor="let field of getFields(rule.entity)" [value]="field.value">
                  {{ field.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
          <ng-container *queryOperator="let rule; let operators=operators; let onChange=onChange">
            <mat-form-field [style.width.px]="90">
              <mat-select [(ngModel)]="rule.operator" (ngModelChange)="onChange()">
                <mat-option *ngFor="let value of operators" [value]="value">
                  {{ value }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
          <ng-container *queryInput="let rule; type: 'phenotype'">
            <button mat-raised-button>Choose HPO Term(s)</button>
          </ng-container>
          <ng-container *queryInput="let rule; type: 'boolean'; let onChange=onChange">
            <mat-checkbox [(ngModel)]="rule.value" (ngModelChange)="onChange()"></mat-checkbox>
          </ng-container>
          <ng-container *queryInput="let rule; let field=field; let options=options; type: 'category'; let onChange=onChange">
            <mat-form-field>
              <mat-select [(ngModel)]="rule.value" (ngModelChange)="onChange()">
                <mat-option *ngFor="let opt of options" [value]="opt.value">
                  {{ opt.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
          <ng-container *queryInput="let rule; type: 'date'; let onChange=onChange">
            <mat-form-field>
              <input matInput [matDatepicker]="picker" [(ngModel)]="rule.value" (ngModelChange)="onChange()">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </ng-container>
          <ng-container *queryInput="let rule; let options=options; type: 'multiselect'; let onChange=onChange">
            <mat-form-field [style.width.px]="300">
              <mat-select [(ngModel)]="rule.value" multiple (ngModelChange)="onChange()">
                <mat-option *ngFor="let opt of options" [value]="opt.value">
                  {{ opt.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>
          <ng-container *queryInput="let rule; let field=field; type: 'number'; let onChange=onChange">
            <mat-form-field [style.width.px]="100">
              <input matInput [(ngModel)]="rule.value" type="number" (ngModelChange)="onChange()">
            </mat-form-field>
            {{field.units}}
          </ng-container>
          <ng-container *queryInput="let rule; let field=field; type: 'string'; let onChange=onChange">
            <mat-form-field>
              <input matInput [(ngModel)]="rule.value" (ngModelChange)="onChange()">
            </mat-form-field>
          </ng-container>
          <ng-container *queryInput="let rule; let field=field; type: 'textarea'; let onChange=onChange">
            <mat-form-field>
              <textarea matInput [(ngModel)]="rule.value" (ngModelChange)="onChange()">
              </textarea>
            </mat-form-field>
          </ng-container>
        </query-builder>
      </div>
    </mat-tab>
    <mat-tab label="JSON">
      <div class="m-v">
        <ngx-json-viewer [(json)]='query'></ngx-json-viewer>
      </div>
    </mat-tab>
    <mat-tab label="SQL">
      <div class="m-v">
        TODO
      </div>
    </mat-tab>
  </mat-tab-group>

  </div>
  `,
  styles: [`
  /deep/ html {
    font: 14px sans-serif;
  }

  .mat-icon-button {
    outline: none;
  }

  .mat-arrow-icon {
    outline: none;
    line-height: 32px;
  }

  .mat-form-field {
    padding-left: 5px;
    padding-right: 5px;
  }

  .text-input {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .text-area {
    width: 300px;
    height: 100px;
  }

  .output {
    width: 100%;
    height: 300px;
  }

  .m-b-sm {
    margin-bottom: 10px;
  }

  .m-t-sm {
    margin-top: 10px;
  }

  .m-a {
    margin: 20px;
  }

  .m-s {
    margin: 0 20px 0 20px;
  }

  .m-v {
    margin: 20px 0 20px 0;
  }

  .h4 {
    font-size: 16px;
    margin: 0;
  }

  .h5 {
    font-size: 14px;
    margin: 0;
  }

  .text-muted {
    color: #4f4f4f;
  }

  .mat-table {
    display: block;
  }

  .mat-row,
  .mat-header-row {
    display: flex;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #CCC;
    align-items: center;
    min-height: 48px;
    padding: 0 24px;
  }

  .mat-cell,
  .mat-header-cell {
    flex: 1;
    overflow: hidden;
    word-wrap: break-word;
    font-size:14px;
  }

  `]
})
export class AppComponent {
  public queryCtrl: FormControl;

  public bootstrapClassNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    arrowIcon: 'fa fa-chevron-right px-2',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control',
    inputControlSize: 'col-auto'
  };


  public configurations = [
    {
      name : "Subjects",
      serviceUrl : "http://matchmaker.org/search",
      query : {
        condition: 'and',
        rules: [
          {field: 'age', operator: '<='},
          {field: 'birthday', operator: '=', value: new Date()},
          {
            condition: 'or',
            rules: [
              {field: 'gender', operator: '='},
              {field: 'occupation', operator: 'in'},
              {field: 'school', operator: 'is null'},
              {field: 'notes', operator: '='}
            ]
          }
        ]
      },
      config : {
        fields: {
          age: { id: 'org.ga4gh.subject.age', spec : "http://ga4gh.org", name: 'Age', type: 'number'},
          dob : { id: 'org.ga4gh.subject.dateOfBirth', spec: "http://ga4gh.org", name: 'Date of Birth', type: 'date', operators : ['=', '<=', '>'] },
          phenotype : {name: 'Phenotype', id : "org.ga4gh.cnp.phenopacket.hpo", spec: "http://ga4gh.org", type: 'phenotype', operators : ['sibling of', 'parent of', 'neighbourhood of', 'is']},
          gender: {
            name: 'Sex',
            type: 'category',
            options: [
              {name: 'Male', value: 'm'},
              {name: 'Female', value: 'f'}
            ]
          },
          name: {name: 'Name', type: 'string'},
          notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
          educated: {name: 'College Degree', type: 'boolean'},
          birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
            defaultValue: (() => new Date())
          },
          school: {name: 'School', type: 'string', nullable: true},
          occupation: {
            name: 'Occupation',
            type: 'category',
            options: [
              {name: 'Student', value: 'student'},
              {name: 'Teacher', value: 'teacher'},
              {name: 'Unemployed', value: 'unemployed'},
              {name: 'Scientist', value: 'scientist'}
            ]
          }
        }
      }
    },
    {
      name : "Data",
      serviceUrl : "http://matchmaker.org/search",
      query : {
        condition: 'and',
        rules: [
          {field: 'age', operator: '<='}
        ]
      },
      config : {
        fields: {
          age: { id: 'org.ga4gh.subject.age', spec : "http://ga4gh.org", name: 'Age', type: 'number'},
          dob : { id: 'org.ga4gh.subject.dateOfBirth', spec: "http://ga4gh.org", name: 'Date of Birth', type: 'date', operators : ['=', '<=', '>'] }
        }
      }
    },
    {
      name : "Personal Genomes Project Canada",
      serviceUrl : "http://matchmaker.org/search",
      query : {
        condition: 'and',
        rules: [
        ]
      },
      config : {
        fields: {
          subject_id : {
            "name": "Subject ID",
            "id": "org.ga4gh.subject.id",
            "type": "number",
            "optional": false
          },
          ethnicity: {
            "name": "Ethnicity",
            "type": "string",
            "id": "ca.pgpc.phenotype.ethnicity"
          },
          body_type: {
            "name": "Body type",
            "type": "string",
            "id": "ca.pgpc.phenotype.body_type"
          },
          allergy: {
            "name": "Allergy",
            "type": "string",
            "id": "ca.pgpc.phenotype.allergy"
          },
          weight: {
            "name": "Weight",
            "type": "number",
            "id": "ca.pgpc.phenotype.body_weight",
            "units": "kg"
          },
          medical_procedure: {
            "name": "Medical Procedure",
            "type": "string",
            "id": "ca.pgpc.phenotype.medical_procedure"
          },
          height: {
            "name": "Height",
            "type": "number",
            "id": "ca.pgpc.phenotype.body_height",
            "units": "cm"
          },
          immunization: {
            "name": "Immunization",
            "type": "string",
            "id": "ca.pgpc.phenotype.immunization"
          },
          blood_pressure: {
            "name": "Blood pressure",
            "type": "string",
            "id": "ca.pgpc.phenotype.blood_pressure",
            "units": "mmhg",
            "notes": "Systolic blood pressure, literal \"/\" character, then diastolic blood pressure"
          },
          birth_year: {
            "name": "Birth year",
            "type": "number",
            "id": "ca.pgpc.phenotype.birth_year",
            "precision": "1 year"
          },
          birth_month: {
            "name": "Birth month",
            "type": "number",
            "id": "ca.pgpc.phenotype.birth_month",
            "precision": "1 month"
          },
          birth_year_month: {
            "name": "Birth year month",
            "type": "string",
            "id": "ca.pgpc.phenotype.birth_year_month",
            "precision": "1 month"
          },
          medication: {
            "name": "Medication",
            "type": "string",
            "id": "ca.pgpc.phenotype.medication"
          },
          blood_type: {
            "name": "Blood type",
            "type": "category",
            "id": "ca.pgpc.phenotype.abo_rhd_blood_group",
            "options" : [
              { name : "A+", value: "Group A, RhD positive" },
              { name : "A-", value: "Group A, RhD positive"},
              { name : "AB+", value: "Group AB, RhD positive"},
              { name : "AB-", value: "Group AB, RhD negative"},
              { name : "B+", value: "Group B, RhD positive"},
              { name : "B-", value: "Group B, RhD negative"},
              { name : "O+", value: "Group O, RhD positive"},
              { name : "O-", value: "Group O, RhD negative"}
            ]
          },
          sex: {
            "name": "Sex",
            "type": "category",
            "id": "ca.pgpc.phenotype.sex",
            options: [
              { value: "M", name: "Male" },
              { value: "F", name: "Female" },
              { value: "X", name: "Intersex"}
            ]
          },
          symptom: {
            "name": "Conditions or Symptom",
            "type": "string",
            "id": "ca.pgpc.phenotype.conditions_or_symptom"
          },
          test_result: {
            "name": "Test Result",
            "type": "string",
            "id": "ca.pgpc.phenotype.test_result"
          }
        }
      }
    }
  ];

  public query = this.configurations[0].query;
  public config = this.configurations[0].config;

  changeConfiguration(configuration) {
    this.currentConfig = configuration.config;
    this.query = configuration.query;
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.config;
  }
}

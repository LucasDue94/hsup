import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {${className}} from '../core/${propertyName}/${propertyName}';
import {${className}Service} from '../core/${propertyName}/${propertyName}.service';
import {Response} from "@angular/http";
<%= componentImports.join('\n') %>

@Component({
  selector: '${propertyName}-persist',
  templateUrl: './${propertyName}-persist.component.html'
})
export class ${className}PersistComponent implements OnInit {

  ${propertyName} = new ${className}();
  create = true;
  errors: any[];
  <%= componentProperties.join('\n  ') %>

  constructor(private route: ActivatedRoute, private ${propertyName}Service: ${className}Service, private router: Router<%= constructorArguments ? ', ' + constructorArguments.join(', ') : '' %>) {}

  ngOnInit() {
    ${initializingStatements.join('\n    ')}
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.${propertyName}Service.get(+params['id']).subscribe((${propertyName}: ${className}) => {
          this.create = false;
          this.${propertyName} = ${propertyName};
        });
      }
      <%= routeParams.join('\n      ') %>
    });
  }

  save() {
    this.${propertyName}Service.save(this.${propertyName}).subscribe((${propertyName}: ${className}) => {
        if (this.${propertyName}.id != null) {
            this.message = `${className} this.${propertyName}.id alterado com sucesso!`;
        } else {
            this.message = "Cadastro realizado com sucesso!";
        }

        let r = this.router;
        setTimeout( function () {
            r.navigate(['/${propertyName}', 'show', ${propertyName}.id]);
        }, 3000);
    }, (res) => {
      const json = res.error;
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  
  navigateToPrevistas (){
    this.router.navigate(['/previstas'])
    }
    
    navigateToRealizadas (){
    this.router.navigate(['/realizadas'])
    }
}
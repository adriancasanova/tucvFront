import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showAddTask: boolean = true;
  subscription?:Subscription;
  constructor(private uiService:UiService) { 
    this.subscription = this.uiService.onToggle()
                              .subscribe(value => this.showAddTask = value)}

  ngOnInit(): void {
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();    
    console.log(this.showAddTask)
     }

}

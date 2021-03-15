import { Component, Input, OnInit} from '@angular/core';
import { Direction } from './direction';
import { Location } from "./location";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tableTopObj : any;
  rows =  [4,3,2,1,0];
  columns =  [0,1,2,3,4];
  reportMsg : string;
  @Input() xCoord: number;
  @Input() yCoord: number;
  @Input() face: string;
  @Input() reportTxt: string ='';
  public currentLocation: Location;
  public directions = ['NORTH','EAST','SOUTH','WEST'];
  constructor() {}

  ngOnInit(){
    this.tableTopObj = {'xLength':4,'yLength':4};
    
  }

  getImageOnIndex(row,col) {
    //console.log("x:"+this.xCoord+" y:"+this.yCoord+" row:"+row+" col:"+col);
    if(!!this.currentLocation){
      if (row == this.currentLocation.y && col==this.currentLocation.x) {
        switch (this.currentLocation.direction){
        case Direction.North:
          return 'assets/north.png';
        case Direction.East:
          return 'assets/east.png';
        case Direction.South:
          return 'assets/south.png';  
        case Direction.West:
          return 'assets/west.png';  
        }
      }
    }
  return 'assets/blank.png';
    
  }

  reset(){
    this.xCoord = undefined;
    this.yCoord = undefined;
    this.face = undefined;
  }

  place(): boolean{
    console.log("place now..");
    if(this.isPlaceValid(this.xCoord,this.yCoord,this.face)){
      this.currentLocation = new Location(this.xCoord,this.yCoord,this.face);
      this.reportTxt = this.reportTxt + "Robot is placed on table<br/>";
      this.reset();
      return true;
    }
    else{
      this.reportTxt = this.reportTxt + "Place is invalid<br/>";
      this.reset();
      return false;
    }  
    
  }

  move(){
    if(!!this.currentLocation){
      if (this.isValidMove(this.currentLocation)) {
        switch (this.currentLocation.direction){
          case Direction.North:
            return ++this.currentLocation.y;
          case Direction.East:
            return ++this.currentLocation.x;
          case Direction.South:
            return --this.currentLocation.y;  
          case Direction.West:
            return --this.currentLocation.x;
        }
      }  
    }
    else
      this.reportTxt = this.reportTxt + "Robot is not on table<br/>"; 
  }

  left(){
    if(!!this.currentLocation){
      this.reportTxt = this.reportTxt + "Robot rotated to left<br/>";
      switch (this.currentLocation.direction){
        case Direction.North:
          this.currentLocation.direction = Direction.West;
          return this.currentLocation.direction;
        case Direction.East:
          this.currentLocation.direction = Direction.North;
          return this.currentLocation.direction;
        case Direction.South:
          this.currentLocation.direction = Direction.East;
          return this.currentLocation.direction;
        case Direction.West:
          this.currentLocation.direction = Direction.South;
          return this.currentLocation.direction;  
      }
    }
    else
      this.reportTxt = this.reportTxt + "Robot is not on table<br/>";   
  }

  right(){
    if(!!this.currentLocation){
      this.reportTxt = this.reportTxt + "Robot rotated to right<br/>";
      switch (this.currentLocation.direction){
        case Direction.North:
          this.currentLocation.direction = Direction.East;
          return this.currentLocation.direction;
        case Direction.East:
          this.currentLocation.direction = Direction.South;
          return this.currentLocation.direction;
        case Direction.South:
          this.currentLocation.direction = Direction.West;
          return this.currentLocation.direction;
        case Direction.West:
          this.currentLocation.direction = Direction.North;
          return this.currentLocation.direction;  
      }
    }
    else
      this.reportTxt = this.reportTxt + "Robot is not on table<br/>"; 
  }

  report(){
    if(!!this.currentLocation)
      this.reportMsg = this.currentLocation.x+","+this.currentLocation.y+","+this.currentLocation.direction;
    else
      this.reportMsg = "Robot is not on table";

    this.reportTxt = this.reportTxt + this.reportMsg+"<br/>"; 
    alert(this.reportMsg);
  }

  isValidMove(currentLocation: Location): boolean {
    var newLocation = new Location(currentLocation.x, currentLocation.y, currentLocation.direction);
    switch (currentLocation.direction) {
        case Direction.North:
            newLocation.y++;
            break;
        case Direction.East:
            newLocation.x++;
            break;
        case Direction.South:
            newLocation.y--;
            break;
        case Direction.West:
            newLocation.x--;
            break;
    }

    if (newLocation.x < 0 || newLocation.x > this.tableTopObj.xLength || newLocation.y < 0 || newLocation.y > this.tableTopObj.yLength) {
      this.reportTxt = this.reportTxt + "Move is invalid<br/>";  
      return false;
    }else{
      this.reportTxt = this.reportTxt + "Robot Moved<br/>";
      return true;
    }
  }

  isPlaceValid(x,y,f): boolean{
    if(typeof x ==='undefined' || typeof y ==='undefined' || typeof f==='undefined' || (x<0 || x>this.tableTopObj.xLength || y<0 || y>this.tableTopObj.yLength))
      return false;
    else
      return true;  
  }

}

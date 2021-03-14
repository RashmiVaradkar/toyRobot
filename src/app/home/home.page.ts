import { Component, Input, OnInit } from '@angular/core';
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
  robotImg : string = "";
  @Input() xCoord: number;
  @Input() yCoord: number;
  @Input() face: string;
  @Input() reportTxt: string ='';
  public currentLocation: Location;
  public directions = [{"Title":"North","Code":"N"},
  {"Title":"East","Code":"E"},
  {"Title":"West","Code":"W"},
  {"Title":"South","Code":"S"}];
  constructor() {}

  ngOnInit(){
    this.tableTopObj = {'xLength':4,'yLength':4};
    
  }

  calcBoxColor(x, y) {
    return ((x + y) % 2 === 0);
  }

  getImageOnIndex(row,col) {
    //console.log("x:"+this.xCoord+" y:"+this.yCoord+" row:"+row+" col:"+col);
    if(!!this.currentLocation){
      if (row == this.currentLocation.x && col==this.currentLocation.y) {
        switch (this.currentLocation.direction){
        case 'N':
          return 'assets/north.png';
        case 'E':
          return 'assets/east.png';
        case 'S':
          return 'assets/south.png';  
        case 'W':
          return 'assets/west.png';  
        }
      }
    }
  return '';
    
  }

  place(): boolean{
    console.log("place now..");
    if(this.isPlaceValid(this.xCoord,this.yCoord,this.face)){
      this.currentLocation = new Location(this.xCoord,this.yCoord,this.face);
      this.reportTxt = this.reportTxt + "Robot is placed on table<br/>";
      return true;
    }
    else{
      this.reportTxt = this.reportTxt + "Place is invalid<br/>";
      return false;
    }  
    
  }

  move(){
    if(!!this.currentLocation){
      if (this.isValidMove(this.currentLocation)) {
        switch (this.currentLocation.direction){
          case 'N':
            return ++this.currentLocation.x;
          case 'E':
            return ++this.currentLocation.y;
          case 'S':
            return --this.currentLocation.x;  
          case 'W':
            return --this.currentLocation.y;
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
        case 'N':
          this.currentLocation.direction = Direction.West;
          return this.currentLocation.direction;
        case 'E':
          this.currentLocation.direction = Direction.North;
          return this.currentLocation.direction;
        case 'S':
          this.currentLocation.direction = Direction.East;
          return this.currentLocation.direction;
        case 'W':
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
        case 'N':
          this.currentLocation.direction = Direction.East;
          return this.currentLocation.direction;
        case 'E':
          this.currentLocation.direction = Direction.South;
          return this.currentLocation.direction;
        case 'S':
          this.currentLocation.direction = Direction.West;
          return this.currentLocation.direction;
        case 'W':
          this.currentLocation.direction = Direction.North;
          return this.currentLocation.direction;  
      }
    }
    else
      this.reportTxt = this.reportTxt + "Robot is not on table<br/>"; 
  }

  report(){
    if(!!this.currentLocation)
    this.reportTxt = this.reportTxt + "x:"+this.currentLocation.x+" y:"+this.currentLocation.y+" direction:"+this.currentLocation.direction+"<br/>";
    else
      this.reportTxt = this.reportTxt + "Robot is not on table<br/>"; 
  }

  isValidMove(currentLocation: Location): boolean {
    var newLocation = new Location(currentLocation.x, currentLocation.y, currentLocation.direction);
    switch (currentLocation.direction) {
        case Direction.North:
            newLocation.x++;
            break;
        case Direction.East:
            newLocation.y++;
            break;
        case Direction.South:
            newLocation.x--;
            break;
        case Direction.West:
            newLocation.y--;
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

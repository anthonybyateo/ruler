import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('map')
  public canvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D | null;

  public mouse = {x:0, y:0, overPath: null};

  public styles = {
    default: {fillStyle: "#0C0", strokeStyle: "#F00", lineWidth: 4},
    over: {fillStyle: "#C008", strokeStyle: "#F0F8", lineWidth: 10},
  };

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    const paths = [
      [100, 50, 350, 50, 500, 45, 500, 80, 350, 85, 100, 80],
      [100, 150, 350, 150, 500, 145, 500, 180, 350, 185, 100, 180],
    ].map(this.createPath);
    if (this.context) {
      this.context.fillStyle = '#f00';
      this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(100, 50);
      this.context.lineTo(50, 100);
      this.context.lineTo(0, 90);
      this.context.closePath();
      this.context.fill();
    }



    this.canvas.nativeElement.addEventListener("mousemove", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.checkMouseOver(paths);
      this.canvas.nativeElement.style.cursor = this.mouse.overPath ? "pointer" : "default";
    })
  }

  public checkMouseOver(paths: any) {
    var over;
    for(const p of paths) { this.context?.isPointInPath(p, this.mouse.x, this.mouse.y) && (over = p) }
    if (over !== this.mouse.overPath) {
      this.mouse.overPath = over;
      this.context?.clearRect(0, 0, 600, 200);
      for (const p of paths) {
        if (p === over) {
          console.log("checkMouseOver")
          this.drawPath(p, this.styles.over)
        } else {
          this.drawPath(p)
        }
      }
    }
  }

  public drawPath(path: any, style = this.styles.default) {
    // @ts-ignore
    Object.assign(this.context, style).fill(path);
    this.context?.stroke(path);
  }

  public createPath(path: any) {
    let i = 0, p = new Path2D;
    while (i < path.length) { p.lineTo(path[i++], path[i++]) }
    p.closePath();
    return p;
  }

}

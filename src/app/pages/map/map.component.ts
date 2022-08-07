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

  public mouse = {x: 0, y: 0, overPath: null};

  public styles = {
    default: {fillStyle: "#0C0", strokeStyle: "#F00", lineWidth: 1},
    over: {fillStyle: "#C008", strokeStyle: "#F0F8", lineWidth: 1},
  };

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    const paths = [
      [10, 10, 500, 10, 500, 100, 100, 200, 10, 100],
      [500, 100, 100, 200, 10, 300],
    ].map(this.createPath);

    paths.forEach(path => this.drawPath(path));

    this.canvas.nativeElement.addEventListener("mousemove", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.checkMouseOver(paths);
      this.canvas.nativeElement.style.cursor = this.mouse.overPath ? "pointer" : "default";
    })
  }

  public checkMouseOver(paths: any) {
    var over;
    for (const path of paths) {
      this.context?.isPointInPath(path, this.mouse.x, this.mouse.y) && (over = path)
    }
    if (over !== this.mouse.overPath) {
      this.mouse.overPath = over;
      this.context?.clearRect(0, 0, 600, 200);
      for (const path of paths) {
        if (path === over) {
          console.log("checkMouseOver")
          this.drawPath(path, this.styles.over)
        } else {
          this.drawPath(path)
        }
      }
    }
  }

  public drawPath(path: any, style = this.styles.default) {
    // @ts-ignore
    Object.assign(this.context, style).fill(path);
    this.context?.stroke(path);
  }

  public createPath(path: any): Path2D {
    const path2D = new Path2D;
    let i = 0;
    while (i < path.length) {
      path2D.lineTo(path[i++], path[i++])
    }
    path2D.closePath();
    return path2D;
  }

}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Color, Location, Style } from '../ParticleModel';

@Component({
  selector: 'app-particle',
  templateUrl: './particle.component.html',
  styleUrls: ['./particle.component.scss']
})
export class ParticleComponent implements OnInit, OnChanges {
  @Input() char: string;
  @Input() size: number;
  @Input() color: Color;
  @Input() location: Location;
  style: Style;

  @Input() newMouse: Location;
  mouseStack = [];

  ngOnInit(): void {
    this.draw();
  }

  ngOnChanges(): void {
    const deltaMouse = this.delta(this.newMouse);
    this.update(deltaMouse);
  }

  delta(coordinates: Location) {
    this.mouseStack.push({
      x: coordinates.x,
      y: coordinates.y,
    } as Location);
    if (this.mouseStack.length > 1) {
      const previous = this.mouseStack[0];
      this.mouseStack.splice(0, 1);
      return {
        x: previous.x - coordinates.x,
        y: previous.y - coordinates.y
      } as Location;
    }
  }

  /*
  * Changes the location for every particle by adding the mouse difference
  * Location change is different for each particle's distance to the screen
  * Checks if the mouse position haschanged to increase performance
  */
  update(delta: Location): void {
    if (delta) {
      this.location.x += delta.x * this.color.alpha / 5;
      this.location.y += delta.y * this.color.alpha / 5;
      this.draw();
    }
  }

  /*
  * Draws the particle on the canvas
  * Checks if the particle is visible to increase performance
  */
  draw(): void {
    if (this.isVisible()) {
      this.style = {
        fontSize: `${this.size}pt`,
        color: this.color.hex,
        opacity: this.color.alpha,
        left: `${this.location.x}pt`,
        top: `${this.location.y}pt`
      } as Style;
    }
  }

  /*
  * Boolean helper functions
  * Used to only draw a particle when it is visible on the screen
  */
  public isVisibleX(): boolean {
    return this.location.x + 2 * this.size > 0 && this.location.x - 2 * this.size < window.innerWidth;
  }
  public isVisibleY(): boolean {
    return this.location.y + 2 * this.size > 0 && this.location.y - 2 * this.size < window.innerHeight;
  }
  public isVisible(): boolean {
    return this.isVisibleX() && this.isVisibleY();
  }
}

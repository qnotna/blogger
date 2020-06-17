import { Injectable } from '@angular/core';
import Particle, { Location, Color } from './particles/ParticleModel';

@Injectable({ providedIn: 'root' })
export class LoginPresenter {
  particles = [];
  stack = [];

  constructor() {}

  /*
  * Creates particles and adds mouse event listeners for window focus changes
  * Event types:
  *   focus: Browser window is now active -> Add mouse movement event listener
  *   blur:  Another window is now active -> Remove event listener and empty stack
  */
  initParticlesWithSize(amount: number, minSize: number, maxSize: number): void {
    for (let i = 0; i < amount; i++) {
      this.particles.push(this.createParticle(minSize, maxSize));
    }
  }

  /*
  * Creates the style for each particle randomly:
  * - char:   minSize ... maxSize
  * - radius: minSize ... maxSize
  * - x, y:   0       ... canvas size
  * - alpha:  0       ... 0.5
  * Adds the particle to the canvas div and particles list
  */
  createParticle(minSize, maxSize): Particle {
    let charset = 'AÄÀÁÂÆÃÅĀBCÇĆČDEÉÈÊËĖFGHHIÎÏÍĪÌJKLMNÑŃOÖÔÒÓÕŒØŌPQRSŚŠTUÜÛÙÚŪVWXYŸZß';
    charset += charset.toLowerCase();
    charset += '說文解字注从日在茻中會意茻亦聲औकखगघङचαβγδεζηθλμνξπρσφψω';
    return {
      char: charset.charAt(Math.floor(Math.random() * charset.length)),
      size: Math.floor(Math.random() * maxSize) + minSize,
      location: {
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight)
      } as Location,
      color: {
        hex: Math.random() < 1 / 5 ? 'dodgerBlue' : 'white',
        alpha: Math.random()
      } as Color
    };
  }

}

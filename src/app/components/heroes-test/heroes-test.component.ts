import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../interfaces/hero';

@Component({
  selector: 'app-heroes-test',
  templateUrl: './heroes-test.component.html',
  styleUrls: ['./heroes-test.component.scss']
})
export class HeroesTestComponent implements OnInit {
  heroes: Hero[];
  constructor(private herosService: HeroService) { }

  ngOnInit(): void {
    this.herosService.getFireBaseHeroes().subscribe(data => {
      this.heroes = data.map(e => {
        console.log(e);
        return {} as Hero;
      });
    });
  }

  create(hero: Hero){
    this.herosService.createHero(hero);
  }

  update(hero: Hero) {
    this.herosService.updateHero(hero);
  }

  delete(id: number) {
    this.herosService.deleteHero(id);
  }

}

import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { Heroes} from './mock-heroes.service';
import { Observable, of } from 'rxjs';
import { MessageService} from './message.service';
import { AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService, private firestore: AngularFirestore,) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(Heroes);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  // tslint:disable-next-line:typedef
  getFireBaseHeroes() {
    this.firestore.collection('hero').snapshotChanges();
  }

  createHero(hero: Hero){
    return this.firestore.collection('hero').add(hero);
  }

  updateHero(hero: Hero){
    delete hero.id;
    this.firestore.doc('hero/' + hero.id).update(hero);
  }

  deleteHero(id: number){
    this.firestore.doc('hero/' + id).delete();
  }

  getHero(id: number): Observable<Hero> {
    const hero = of(Heroes.find((hero) => hero.id === id));
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return hero;
  }

}

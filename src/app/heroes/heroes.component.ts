import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
/*import { HEROES } from '../mock-heroes';*/
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
  


})


export class HeroesComponent implements OnInit{
 /* hero = 'Windstorm';*/
 /*hero: Hero = {id: 1,
  name: 'Windstorm'
};*/

  selectedHero?: Hero;
  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/
  
  /*heroes=HEROES;*/
  heroes: Hero[] = [];
  
  /*constructor(private heroService: HeroService, private messageService: MessageService) { }*/
  constructor(private heroService: HeroService) { }

   
  ngOnInit(): void {
    this.getHeroes();
  }

/*  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }*/

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    /*
    If you neglect to subscribe(), the service can't send the delete request to the server. 
    As a rule, an Observable does nothing until something subscribes.
    Confirm this for yourself by temporarily removing the subscribe(), clicking Dashboard, then clicking Heroes. 
    This shows the full list of heroes again.
    */
    this.heroService.deleteHero(hero.id).subscribe();


  }

}

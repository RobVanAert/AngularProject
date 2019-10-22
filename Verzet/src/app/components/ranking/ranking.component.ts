import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import { Ranking } from './ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.sass']
})
export class RankingComponent implements OnInit {

  availableYears: number[] = [];
  actualYear: number;
  rankingYear: number;
  rankedRiders: Map<string, []>;
  rankings: Ranking[] = [];
  displayedColumns: string[] = ['ranking', 'user', 'rides', 'distance']
  
  constructor(private rankingService: RankingService) { 
    this.actualYear = new Date().getFullYear();
    this.rankingYear = this.actualYear;
    this.getAvailableYears();
  }

  ngOnInit() {
    this.getRankings()
  }

  getAvailableYears() {
    for (let index = this.actualYear; index <=2019 ; index++) {
      this.availableYears.push(index);   
    }
  }

  changeYear(year: number) {
    this.rankingYear = year;
  }

  groupBy(list: Array<any>, keyGetter: any): Map<any, any> {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  getRankings(){
    let vm = this;
    this.rankingService.getRidesOfYear(this.rankingYear).subscribe(result =>{ 
      this.rankedRiders = this.groupBy(result, ride => ride.userId);
      this.rankedRiders.forEach((value: any, key: any) => {
        let ranking = new Ranking();
        ranking.user = key;
        ranking.totalRides = value.length;
        ranking.totalDistance = 0;
        value.forEach(ride => {
          ranking.totalDistance += ride.distance;
        })
        vm.rankings.push(ranking);
      });
     this.rankings = this.sortRankingToDistance(vm.rankings);      
    })
  }


  sortRankingToDistance(rankings: Ranking[]) {
    rankings.sort((a,b) => {
      return b.totalDistance - a.totalDistance
    })
    let index = 1;
    rankings.forEach(ranking =>{
      ranking.ranking = index;
      index ++;
    } )
    return rankings;
  }

}

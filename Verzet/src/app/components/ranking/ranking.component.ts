import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import { Ranking } from './ranking';
import { UserService } from 'src/app/services/user.service';

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
  
  constructor(private rankingService: RankingService, private userService: UserService) {}

  ngOnInit() {
    this.actualYear = new Date().getFullYear();
    this.rankingYear = this.actualYear;
    this.getAvailableYears();
    this.getRankings()
  }

  getAvailableYears() {
    for (let index = this.actualYear; index >= 2019 ; index--) {
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
        this.userService.getUser(key).subscribe(
          user =>ranking.user = user
        )
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
      if(b.totalDistance - a.totalDistance !== 0) {
        return b.totalDistance - a.totalDistance;
      } else {
        return b.totalRides - a.totalRides;
      }
    })
    let rankingIndex = 1;
    rankings[0].ranking = rankingIndex;

    for (let index = 1; index < rankings.length; index++) {
      if (rankings[index].totalRides === rankings[index-1].totalRides && rankings[index].totalDistance === rankings[index-1].totalDistance) {
        rankings[index].ranking = rankingIndex;
      } else {
        rankingIndex ++;
        rankings[index].ranking = rankingIndex;
      } 
    }
    return rankings;
  }
}

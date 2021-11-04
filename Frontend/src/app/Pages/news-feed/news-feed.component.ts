import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { NewsfeedService } from 'src/app/newsfeed.service';
import { newsFeed_ } from 'src/app/models/newsfeed';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User_Collection from 'src/app/models/user_collection';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent  implements OnInit{

  news_feed:any = [];
  user_id:string = "";
  fav_sub:any = [];

  constructor(
    private newsfeedservice:NewsfeedService,
    private route:ActivatedRoute,
    private routers:Router,
    private ref : ChangeDetectorRef,
    private http : HttpClient
    ) {
      this.route.params.subscribe((params:Params) => this.user_id = params.name);
  }
  ngOnInit(): void {

      this.news_feed = [];
      this.http.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=30a10c369c4f4f39a98e55732a5b8bb2')
        .subscribe((res:any)=>this.news_feed.push(res));

      this.newsfeedservice.get_fav_sub(this.user_id).subscribe((fav:any)=>this.fav_sub.push(fav));
      console.log(this.fav_sub);
  }
  addtofav(title:string){
          this.newsfeedservice.set_fav(this.user_id,title).subscribe((fav:any)=>{
          this.fav_sub.push(fav);
    });
  }
  addtosub(srcname:string)
  {
      this.newsfeedservice.set_sub(this.user_id,srcname).subscribe((fav:any)=>{
      this.fav_sub.push(fav);
    });
  }
  filter_category(q_category_string:string)
  {
      this.news_feed = [];
      this.http.get('https://newsapi.org/v2/top-headlines?country=in&category='+q_category_string+'&apiKey=30a10c369c4f4f39a98e55732a5b8bb2')
          .subscribe((res:any)=>this.news_feed.push(res));
  }
  filter_country(q_country_string:string)
  {
      this.news_feed = [];
      this.http.get('https://newsapi.org/v2/top-headlines?country='+q_country_string+'&apiKey=30a10c369c4f4f39a98e55732a5b8bb2')
          .subscribe((res:any)=>this.news_feed.push(res));

  }
  filter_source(q_source_string:string)
  {
    this.news_feed = [];
    this.http.get('https://newsapi.org/v2/top-headlines?sources='+q_source_string+'&apiKey=30a10c369c4f4f39a98e55732a5b8bb2')
         .subscribe((res:any)=>this.news_feed.push(res));

  }
  filter_search(q_search_string:string)
  {
    this.news_feed = [];
    this.http.get('https://newsapi.org/v2/top-headlines?q='+q_search_string+'&apiKey=30a10c369c4f4f39a98e55732a5b8bb2')
        .subscribe((res:any)=>this.news_feed.push(res));
  }

}

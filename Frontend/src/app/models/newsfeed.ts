export class newsFeed_{
  status:string = "";
  totalResults:number = 0;
  articles:articles_ = new articles_();
}
class articles_{
  source:source_ = new source_();
  author:string = "";
  title:string = "";
  description:string = "";
  url:string = "";
  urlToImage:string = "";
  publishedAt:string = "";
  content:string = "";
}
class source_{
    id:string = "";
    name:string = "";
}

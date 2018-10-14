import m from 'mithril';
import moment from 'moment';
import 'moment/locale/de-ch';

import './SocialMediaPlugin.less';

const request_url = "http://127.0.0.1:5000/socialApi/facebook?fields=posts.limit(1){created_time,message,full_picture}";


export default class SocialMediaComponent {
  constructor(vnode) {
    this.item = vnode.attrs;
    this.content = "";
  }

  oninit(vnode) {
    const {title, href} = this.item;
    this.content = '';
    if(title == "Twitter"){
     m.request({
         method: "GET",
         url: "http://127.0.0.1:5000/socialApi/twitter?limit=1",
         extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
     }).then(response => {
      this.content = m.trust(response.body);
      loadScript("https://platform.twitter.com/widgets.js", function(){});
    });
   }else if(title == "Facebook"){
      m.request({
        method: "GET",
        url: request_url,
      }).then(response => {
        //console.log(response.posts.data)
        
        this.content = m("div.facebook", [
          m("div.header",m("a",{href},"Facebook Feed")),
          response.posts.data.map(function(post) {
              var img_class = "";
              if(post.full_picture){
                img_class = ".picture";
              }
              
              return m("div.element",[ 
                  m("div.time", get_date(post.created_time)),
                  m("img",{src:post.full_picture},''),
                  m("p"+img_class,post.message),
                ]
              );
          }),
        ])
      });
    }
  }
  

  view() {
    const {title, href} = this.item;
    if (title == "Twitter"){
      return m('div.socialMedia.twitter', this.content);
    }else if(title == "Facebook"){
      return m('div.socialMedia', this.content);
    }
  }
}

function get_date(data){
  return moment(data).fromNow();
}

//loading external script
function loadScript(url, callback){
  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState){  //IE
      script.onreadystatechange = function(){
          if (script.readyState == "loaded" ||
                  script.readyState == "complete"){
              script.onreadystatechange = null;
              callback();
          }
      };
  } else {  //Others
      script.onload = function(){
          callback();
      };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}


import m from 'mithril';
import { apiUrl } from 'config';
import './SocialMediaPlugin.less';

const request_url = "http://127.0.0.1:5000/socialApi/facebook?fields=posts{created_time%2Cmessage%2Cfull_picture}";


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
         url: "http://127.0.0.1:5000/socialApi/twitter",
         extract: function(xhr) {return {status: xhr.status, body: xhr.responseText}}
     }).then(response => {
      this.content = m.trust(response.body);
      loadScript("https://platform.twitter.com/widgets.js", function(){
      });
    });
   }else if(title == "Facebook"){
      var result;

      m.request({
        method: "GET",
        url: request_url,
      }).then(response => {
        console.log(response.posts.data)
        result = m("div.facebook", [
          m("a",{href},"Facebook"),
          response.posts.data.map(function(post) {
              return m("li",[ 
                  m("div", post.created_time),
                  m("p",post.message),
                  m("img",{src:post.full_picture},'')
                ]
              );
          })
        ])
        this.content = result;
      });
    }
  }
  

  view() {
    const {title, href} = this.item;
    if (title == "Twitter"){
      return m('div.socialMedia.twitter', this.content);
    }else if(title == "Facebook"){
      console.log(this.content);
      return m('div.socialMedia', this.content);
    }
  }
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


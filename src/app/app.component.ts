import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatApp';
  userName:string;
  userPicURL:string;
  userEmail:string;
  userId:string;
  items:FirebaseListObservable<any[]>;
  told:FirebaseListObservable<any[]>;
  checker;
  msgChecker;
  newMesage:boolean=true;
  active:boolean=true;
  msgkey:string;
  mykey:string;
  constructor(public af: AngularFire) {
    this.items = af.database.list('/UserList');
    this.told=af.database.list('/globalMessages');
    console.log(this.af.auth?this.af.auth.getAuth():"nothing");
  }
  login(){
    this.af.auth.login();
    this.checker=setInterval(() => { 
      this.userName=this.af.auth.getAuth().auth.displayName;
      this.userEmail=this.af.auth.getAuth().auth.email;
      this.userPicURL=this.af.auth.getAuth().auth.photoURL;
      this.userId=this.af.auth.getAuth().auth.uid;
      if(this.userId!=null){
        this.items.push({uid:this.userId, name: this.userName , email: this.userEmail, photo: this.userPicURL}).then((item) => { 
            this.mykey=item.key;
         });
        clearInterval(this.checker);
      }
     }, 1000*2);
  }
  logout(key:string){
    this.items.remove(key); 
    this.af.auth.logout();
  }
  message(msg:string){
    if(this.newMesage){
      this.told.push({senderName: this.userName, senderPhoto: this.userPicURL, message: msg}).then((item) => { 
            this.msgkey=item.key;
         });
      this.newMesage=false;
    }
    else{
      this.told.update(this.msgkey,{message: msg});
    }
  }
  submit(){
    this.newMesage=true;
    this.active=false;
    setTimeout(()=>this.active=true,0);
  }
}

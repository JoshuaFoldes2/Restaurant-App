function account(name, password, phoneNumber, email) { 
   this.name = name; 
   this.
   this.password = password;
   this.phoneNumber = phoneNumber;
   this.email = email;
   getName: function(){
       return name;
   }
   getPassword: function(){
       return password;
   }
   getPhoneNumber: function(){
       return phoneNumber;
   }
   getemail: function(){
       return email;
   }
} 
function food(name, image, sizeList, quantity, spicinessList, priceList) { 
   this.name = name; 
   this.image = image;
   this.sizeList = sizeList;
   var size = sizeList[0];
   this.quantity = quantity;
   this.spicinessList = spicinessList;
   var spiciness = spicinessList[0];
   this.priceList = priceList;
   var price = priceList[0];
   getName: function(){
       return name;
   };
   getImage: function(){
       return image;
   };
   getSizeList: function(){
       return sizeList;
   };
   getSize: function(){
       return size;
   };
   getQuantity: function(){
       return quantity;
   };
   getSpiciness: function(){
       return spiciness;
   }
   getPrice: function(){
       return price;
   }
   updateQuantity: function(value){
       quantity = value;
       return;
   }
   changePrice: function(value){
       price = value;
       return;
   }
   changeSize: function(value){
       size = value;
       for(i = 0; i < sizeList.length(); i++){
          if(sizeList[i].includes(size)){
            changePrice(priceList[i]);
            return;
        ``}
       }
   }
   changeSpiciness: function(value){
       spiciness = value;
   }
   
} 
function order(fooldlist, account) { 
   this.foodList = foodList; 
   this.account = account;
   statusList = ["Received Order","Preparing Order","Order Done","Picked Up"];
   status = 0;
   listOrder: function(){
       var str
       for(i = 0;i < foodList.length();i++){
           str.concat(foodlist[i].quantity().toString() + " " + foodlist[i].size() + " " + foodlist[i].name() + "\n")
           return str;
       }
   }
   listOrder: function(){
       var cost
       for(i = 0;i < foodList.length();i++){
           cost = cost + foodList.price();
       }
       cost = cost * 1.07;
       return cost;
   }
   UpdateStatus: function(){
       status++;
   }   
} 
function login(email, password, type){
    if((con.query("SELECT * FROM" + type + "WHERE email = '" + email + "'").localeCompare("Empty set") != 0) && (con.query("SELECT * FROM" + type + "WHERE password = '" + password + "'").localeCompare("Empty set") != 0)){
        location.href="Menu.html";
    }
    else{
        alert("E-mail or Password incorrect");
    }
}
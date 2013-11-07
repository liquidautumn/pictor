Template.list.posts= function () {
 return Posts.find({}, {sort: {created_on:-1}}); // вывести сообщения в порядке, где последнее по дате выше
};

Template.userlist.users= function () {
  return Meteor.users.find();
};

Template.form.events({
  'click button#buttonNew' : function () {
    if (!$('#textarea').val()) {}

    else { 
       var options = { ownPost: $("#textarea").val() };
      if (Meteor.user()) {
        options.name = Meteor.user().username;  //Meteor.user().emails[0].address;
      }
      else {
        options.name = $('#firstName').val();
      }
      Posts.insert(options);
    }

    $('#textarea').val('');
    $('#firstName').val('');             
  }
});

/*Template.profile.events({
  'click button#buttonSave' : function () {
    //if(!$('fullFirstName').val()) {}
      //else( )
      var profile = {
        fullFirstName : function () {
          if (!$('#fullFirstName').val()) {}
          else {
            $('#fullFirstName').val();
          }
        },
        fullLastName :  function () {
          if (!$('#fullLastName').val()) {}
          else {$('#fullLastName').val();
          }
        },
        avURL :  function () {
          if (!$('#avURL').val()) {}
          else {$('#avURL').val();
          }
        }
      };
   // Users.insert(profile);
  
  }
});*/

/*Template.myGalleries.events({
  'click button#imgSend' : function () {

    if (!$('#image').val()) {
      alert ("Не введдён адрес");  
    }

    else { 
          var options = { image : $("#image").val(),
                          note : $("#imageNote").val(), 
                          imageCollection : $("#imageCollection").val()
                        };   
    if (Meteor.user()) {
        options.from_id = Meteor.user()._id;
        options.username = Meteor.user().username;
        }

      Images.insert(options);
    }
    $('#image').val(''); 
    $("#imageNote").val('');  

  }
});*/
   

Template.privateMessagePanel.events({
  'click button#send' : function () {
    if (!$('#textarea').val()) {}

    else { 
       var options = { message: $("#textarea").val(),
                       to_id : this._id
                       };
      if (Meteor.user()) {
        options.from_id = Meteor.user()._id;
        options.username = Meteor.user().username;
              }
      else {
        options.username = $('#firstName').val();
      }
      Messages.insert(options);
    }

    $('#textarea').val('');           
  }
});

Template.privateMessagePanel.messages= function () {
  return Messages.find({$or: [{to_id: Meteor.user()._id, from_id: this._id }, {to_id: this._id, from_id: Meteor.user()._id }]}, {sort: {created_on:-1}}); 
}; 

Template.myMessages.messages= function () {
  return Messages.find({to_id: Meteor.user()._id}, {sort: {created_on:-1}});  
};
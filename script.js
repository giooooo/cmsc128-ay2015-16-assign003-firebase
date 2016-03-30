
'use strict';

$(document).ready(function(){
    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    const db = new Firebase('https://eventguestatttendance.firebaseio.com/');
    const submitBtn = $('#submit');
    const nameField = $('#name');
    const orgField = $('#organization');
    const contactField = $('#contact_number');
    const items = $('#items');

    db.on('child_added', function(data){
        data = data.val();
        appendChild(data.name, data.organization, data.contact_number);

    });

    function appendChild(name, org, contactnum){

        const template = '<li class="collection-item avatar">' +
                            '<i class="material-icons circle red">play_arrow</i>' +
                                '<span class="title">' + name + '</span>' + 
                                    '<p>' + org + '<br>' +
                                    '</p>'+
                                    contactnum + 
                                    '<a href="" class="secondary-content"><i class="material-icons">grade</i></a>' +
                          '</li>';
        $('.collection').append(template);
    };

    submitBtn.click(function(){
        let name    = nameField.val();
        let org     = orgField.val();
        let contact = contactField.val();

        if(name.trim() == "" || org.trim()  == "" || contact.trim() == "") 
            return Materialize.toast('Please fill in the empty fields!', 2000);

        if(isNaN(contact.trim()))
            return Materialize.toast('Please enter a valid contact number!', 2000);

        db.push({name : name, organization : org, contact_number : contact});

        nameField.val('');
        orgField.val('');
        contactField.val('');

        nameField.blur();
        orgField.blur();
        contactField.blur();

        return false;

    });

    $('.input-field').keypress(function(e){
        if(e.keyCode == 13)
            return submitBtn.click();
    });

    items.css('display', 'block');
});
window.addEventListener('load', _ => {

    // document.cookie = 'user=ALex';
    // document.cookie = 'login=user-alex';

    // document.cookie = 'user=Bob';
    // document.cookie = 'info=' + encodeURIComponent('Жили-были да не тужили');

    // console.log(decodeURIComponent('%D0%96%D0%B8%D0%BB%D0%B8-%D0%B1%D1%8B%D0%BB%D0%B8%20%D0%B4%D0%B0%20%D0%BD%D0%B5%20%D1%82%D1%83%D0%B6%D0%B8%D0%BB%D0%B8'));

    // document.cookie = 'user2=Peter; path=/news/post/post1';

    // document.cookie = 'user3=Mike; domain=*.localhost';

    // let date = new Date(Date.now() + 10000);
    // date = date.toUTCString();

    // document.cookie = 'user4=Bill; expires=' + date;

    // // document.cookie = 'user5=Marta; max-age=10';

    // document.cookie = 'user6=John; secure';

    // console.log(document.cookie);

    const authInfo = {
        login: 'admin',
        password: 'admin'
    };

    const getCookie = function(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

    const auth = function() {
        let form = this.closest('.form'),
            inputLogin = form.querySelector('input[name="login"]').value,
            inputPass = form.querySelector('input[name="password"]').value;

        if (inputLogin === authInfo.login && inputPass === authInfo.password) {
            document.cookie = 'auth=true';
            document.cookie = 'authLogin=' + inputLogin;

            window.location = '/app.html';
        } else {
            alert ("Login or password is incorrect");
        }
    };

    const logout = function() {
        if (!getCookie('auth') || !getCookie('authLogin')) return;
        document.cookie = 'auth=; max-age=-1';
        document.cookie = 'authLogin=; max-age=-1';

        if (!getCookie('auth')) window.location.reload();
    };

    if (window.location.pathname == '/app.html' && !getCookie('auth')) 
        window.location = '/index.html';

    if (window.location.pathname == '/index.html' && getCookie('auth') === 'true') 
        window.location = '/app.html';

    let buttonSignin = document.querySelector('.form .signin'),
        buttonLogout = document.querySelector('.contacts .logout');

    if (buttonSignin) buttonSignin.addEventListener('click', auth);
    if (buttonLogout) buttonLogout.addEventListener('click', logout);

    // sessionStorage && localStorage 

    
    let contactsData = [];
    
    const contactsUpdate = function() {
        let localContactsData = localStorage.getItem('contactsData');
        if (localContactsData.length > 0) contactsData = JSON.parse(localContactsData);

        let contactsList = document.querySelector('.contacts_list ul');
        contactsList.innerHTML = '';

        contactsData.forEach(function(contact, id) {
            let elemContact = document.createElement('li');

            elemContact.innerHTML = `
                <div class="id">${id + 1}</div>
                <div class="name">${contact.name}</div>
                <div class="phone">${contact.phone}</div>
            `;

            contactsList.appendChild(elemContact);
        });
    };

    const contactAdd = function() {
        let form = this.closest('.form_add'),
            inputName = form.querySelector('input[name="name"]').value,
            inputPhone = form.querySelector('input[name="phone"]').value;

        if (inputName.length == 0 || inputName == ' ' || inputPhone.length == 0 || inputPhone == ' ') return;

        let contact = {
            name: inputName,
            phone: inputPhone
        };


        contactsData.push(contact);
        localStorage.setItem('contactsData', JSON.stringify(contactsData));

        contactsUpdate();

        sessionStorage.removeItem('contactInputName');
        sessionStorage.removeItem('contactInputPhone');
    };

    const contactSave = function() {
        let form = this.closest('.form_add'),
            inputName = form.querySelector('input[name="name"]').value,
            inputPhone = form.querySelector('input[name="phone"]').value;

        if (inputName.length == 0 || inputName == ' ' || inputPhone.length == 0 || inputPhone == ' ') return;

        let contact = {
            name: inputName,
            phone: inputPhone
        };

        sessionStorage.setItem('contactInputName', inputName);
        sessionStorage.setItem('contactInputPhone', inputPhone);
    };

    let buttonAdd = document.querySelector('.form_add .add'),
        buttonSave = document.querySelector('.form_add .save');

    if (buttonAdd) buttonAdd.addEventListener('click', contactAdd);
    if (buttonSave) buttonSave.addEventListener('click', contactSave);

    if (window.location.pathname == '/app.html') {
        contactsUpdate();
        
        let contactInputName = sessionStorage.getItem('contactInputName'),
            contactInputPhone = sessionStorage.getItem('contactInputPhone');

        if (contactInputName && contactInputName.length > 0 && contactInputPhone && contactInputPhone.length > 0) {
            let form = document.querySelector('.form_add'),
            inputName = form.querySelector('input[name="name"]'),
            inputPhone = form.querySelector('input[name="phone"]');

            inputName.value = contactInputName;
            inputPhone.value = contactInputPhone;
        }
    };
});
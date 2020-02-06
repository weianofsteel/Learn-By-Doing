// account

function Account() {
    this.keyValueState = {};
};

Account.prototype.isStringEmail = function(str){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(str).toLowerCase());
}

Account.prototype.isStringPasswordFormat = function(str){
    var regex = /^[\w\s#&><@$_\-\\\.\*]{8,20}$/;
    return regex.test(str);
}

Account.prototype.isStringText = function(str){
    var regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(str);
}

Account.prototype.isNameText = function(str){
    var regex = RegExp('^[a-zA-Z]{3,30}(\\s[a-zA-Z]{3,30}){0,4}$');
    return regex.test(str);
}

Account.prototype.initInputField = function(selectors, key, validateFunc, syncFunc){
    var input = document.querySelector(selectors)
    var warning = input.parentElement.querySelector(".warning-string");
    var isFormatCorrect = false;
    this.keyValueState[key] = false;
    input.addEventListener('input', function (e) {
        var thisInput = e.target;
        if (validateFunc(thisInput.value)) {
            warning.style.display = "none";
            isFormatCorrect = true
        } else {
            warning.style.display = "";
            isFormatCorrect = false
        }
        var newValue = {};
        newValue[key] = isFormatCorrect;
        syncFunc(newValue)
    })
    warning.style.display = "none";
}

Account.prototype.canSubmit = function (keyValueObject) {
    var keys = Object.keys(this.keyValueState);
    keys.forEach(function(key){
        if(undefined !== keyValueObject[key]){
            this.keyValueState[key] = keyValueObject[key];
        }
    }.bind(this));

    var submit = document.querySelector("#submit-button");

    var canSubmit = true;
    keys.forEach(function(key){
        canSubmit = canSubmit && this.keyValueState[key];
    }.bind(this));

    submit.disabled = !canSubmit;
}

// log in

function LogIn() {
    Account.call(this)

    this.initInputField(
        "#user_email", 
        "isEmailFormatCorrect",
        this.isStringEmail, 
        function(value){
            this.canSubmit(value)
        }.bind(this));

    this.initInputField(
        "#user_password", 
        "isPasswordFormatCorrect",
        this.isStringPasswordFormat, 
        function(value){
            this.canSubmit(value)
        }.bind(this));
};

LogIn.prototype = Object.create(Account.prototype);
LogIn.prototype.constructor = LogIn;

// person

function Person(first, last, age, gender, interests) {
    this.name = {
        first,
        last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
};

Person.prototype.greeting = function () {
    alert('Hi! I\'m ' + this.name.first + '.');
};

function Teacher(first, last, age, gender, interests, subject) {
    Person.call(this, first, last, age, gender, interests)

    this.subject = subject;
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;
Teacher.prototype.greeting = function () {
    var prefix;

    if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
        prefix = 'Mr.';
    } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
        prefix = 'Mrs.';
    } else {
        prefix = 'Mx.';
    }

    alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};


// function Student(first, last, age, gender, interests) {
//     Person.call(this, first, last, age, gender, interests)
// }

// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;
// Student.prototype.greeting = function () {
//     alert('Hello. My first name is ' + this.name.first + "." );
// };

// var s = new Student("PB", "TW", 18, "man", [])
// s.greeting()

// sign up

function SignUp() {
    Account.call(this)

    this.initInputField(
        "#user_id",
        "isUserIdFormatCorrect",
        this.isStringText,
        function (value) {
            this.canSubmit(value)
        }.bind(this));

    this.initInputField(
        "#user_email",
        "isEmailFormatCorrect",
        this.isStringEmail,
        function (value) {
            this.canSubmit(value)
        }.bind(this));

    this.initInputField(
        "#user_password",
        "isPasswordFormatCorrect",
        this.isStringPasswordFormat,
        function (value) {
            this.canSubmit(value)
        }.bind(this));

    this.initInputField(
        "#user_password_confirmation",
        "isPasswordConfirmationCorrect",
        this.isPasswordEquelToPasswordConfirmation,
        function (value) {
            this.canSubmit(value)
        }.bind(this));
};

SignUp.prototype = Object.create(Account.prototype);
SignUp.prototype.constructor = SignUp;
SignUp.prototype.isPasswordEquelToPasswordConfirmation = function (str) {
    var passwordInput = document.querySelector("#user_password");
    return str === passwordInput.value;
}

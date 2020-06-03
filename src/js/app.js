// ! RESET NOT IMPLEMENTED
// ! EVENT LISTENER NOT CLEARED
// ! NO BEST SCORE
// ! SOME ERROR BOUNDARIES ARE NOT SET (e.g. players can choose the same button)
// ! COUNTDOWN TO MATCH START
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var inputControl = document.querySelector('#race-input-control');
var inputName = document.querySelector('#race-input-name');
var buttonAdd = document.querySelector('#race-btn-add');
var buttonStart = document.querySelector('#race-btn-start');
var currentId = 1;
var SnailManager = /** @class */ (function () {
    function SnailManager() {
        var _this = this;
        this.moveSnail = function () {
            console.log('match has started');
            snailAdd.snailList.forEach(function (snail) {
                document.addEventListener('keyup', function (e) {
                    if (e.keyCode === snail.control && snail.progress < 80) {
                        snail.progress += 2;
                        var snailElement = document.querySelector('#snail-' + snail.id);
                        snailElement.style.left = snail.progress.toString() + 'rem';
                        _this.started = true;
                    }
                    else if (snail.progress === 80 && !snail.finished) {
                        snail.finished = true;
                        _this.matchFinished = true;
                        alert(snail.name + ' has won the snail race!');
                    }
                    else if (_this.matchFinished) {
                        var buttonReset = document.createElement('button');
                        buttonReset.id = 'btn-race-reset';
                        buttonReset.className = 'race__btn';
                        buttonReset.innerHTML = 'Reset';
                        document.querySelector('.race__control').appendChild(buttonReset);
                    }
                });
            });
        };
        this.createSnail = function (id) {
            if (inputControl.value && inputName.value && currentId <= 6) {
                var snail = new Snail(id, inputName.value, "url(./src/img/snail" + id + ".png)", +inputControl.value);
                _this.snailList = __spreadArrays(_this.snailList, [snail]);
                console.log(_this.snailList);
                var snailElement = document.createElement('div');
                snailElement.id = 'snail-' + snail.id.toString();
                snailElement.className = 'race__snail';
                snailElement.style.backgroundImage = snail.img;
                document.querySelector('#race-way').appendChild(snailElement);
                var nameTag = document.createElement('h3');
                nameTag.className = 'race__nametag';
                nameTag.innerHTML = snail.name;
                snailElement.appendChild(nameTag);
                inputControl.value = null;
                inputName.value = null;
            }
        };
        this.snailList = [];
        this.started = false;
        this.matchFinished = false;
    }
    return SnailManager;
}());
var snailAdd = new SnailManager();
var Snail = /** @class */ (function () {
    function Snail(id, name, img, control) {
        this.finished = false;
        this.progress = 0;
        this.id = id;
        this.name = name;
        this.img = img;
        this.control = control;
    }
    return Snail;
}());
inputControl.addEventListener('keyup', function (e) {
    inputControl.value = e.keyCode.toString();
});
buttonAdd.addEventListener('click', function () {
    if (inputControl.value && inputName.value && !snailAdd.started) {
        snailAdd.createSnail(currentId++);
    }
});
buttonStart.addEventListener('click', function () { return !snailAdd.started && snailAdd.moveSnail(); });
//# sourceMappingURL=app.js.map
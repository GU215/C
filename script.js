localStorage.setting = 1;

const slider_one = el => document.querySelector(el);

slider_one('#slider1').addEventListener('input', e => {
    slider_one(':root').style.setProperty('--rotate-x', `${e.target.value}deg`);
});
const slider_two = el => document.querySelector(el);

slider_two('#slider2').addEventListener('input', e => {
    slider_two(':root').style.setProperty('--rotate-y', `${e.target.value}deg`);
});
const slider_three = el => document.querySelector(el);

slider_three('#slider3').addEventListener('input', e => {
    slider_three(':root').style.setProperty('--rotate-z', `${e.target.value}deg`);
});

const slider_four = el => document.querySelector(el);

slider_four('#slider4').addEventListener('input', e => {
    slider_four(':root').style.setProperty('--creeper-size', `${e.target.value}` / 100);
});
const slider_one_num = el => document.querySelector(el);

slider_one_num('#number1').addEventListener('input', e => {
    slider_one_num(':root').style.setProperty('--rotate-x', `${e.target.value}deg`);
});
const slider_two_num = el => document.querySelector(el);

slider_two_num('#number2').addEventListener('input', e => {
    slider_two_num(':root').style.setProperty('--rotate-y', `${e.target.value}deg`);
});
const slider_three_num = el => document.querySelector(el);

slider_three_num('#number3').addEventListener('input', e => {
    slider_three_num(':root').style.setProperty('--rotate-z', `${e.target.value}deg`);
});

const slider_four_num = el => document.querySelector(el);

slider_four_num('#number4').addEventListener('input', e => {
    slider_four_num(':root').style.setProperty('--creeper-size', `${e.target.value}`);
});
const hoge1 = document.getElementById("number1");
hoge1.addEventListener('input', () => {
    document.getElementById("slider1").value = hoge1.value;
}
);
const hoge2 = document.getElementById("number2");
hoge2.addEventListener('input', () => {
    document.getElementById("slider2").value = hoge2.value;
}
);
const hoge3 = document.getElementById("number3");
hoge3.addEventListener('input', () => {
    document.getElementById("slider3").value = hoge3.value;
}
);
const hoge4 = document.getElementById("number4");
hoge4.addEventListener('input', () => {
    document.getElementById("slider4").value = hoge4.value;
}
);
const hooe1 = document.getElementById("slider1");
hooe1.addEventListener('input', () => {
    document.getElementById("number1").value = hooe1.value;
}
);
const hooe2 = document.getElementById("slider2");
hooe2.addEventListener('input', () => {
    document.getElementById("number2").value = hooe2.value;
}
);
const hooe3 = document.getElementById("slider3");
hooe3.addEventListener('input', () => {
    document.getElementById("number3").value = hooe3.value;
}
);
const hooe4 = document.getElementById("slider4");
hooe4.addEventListener('input', () => {
    document.getElementById("number4").value = hooe4.value;
}
);
const drag = document.querySelector(".outer");

function MouseDown(event) {

    function MouseMove(event) {

        if (localStorage.setting == 1) {

            localStorage.nowX = event.clientX;
            localStorage.nowY = event.clientY;

            const cssXnow = Math.floor(getComputedStyle(document.documentElement).getPropertyValue('--rotate-x').replace("deg", "")) % 360;
            if (cssXnow <= 90 && cssXnow >= -90) {
                localStorage.cssJudge = 1;
            } else if (Math.abs(cssXnow) >= 270 && Math.abs(cssXnow) <= 360) {
                localStorage.cssJudge = 1;
            } else {
                localStorage.cssJudge = 0;
            }

        }

        console.log(localStorage.cssJudge);

        const differenceX = (event.clientX - localStorage.nowX) * -1,
            differenceY = event.clientY - localStorage.nowY;

        localStorage.setting++;

        localStorage.nowX = event.clientX;
        localStorage.nowY = event.clientY;

        if (localStorage.cssJudge == 1) {
            var cssY = getComputedStyle(document.documentElement).getPropertyValue('--rotate-y').replace("deg", "") - differenceX * 0.3;
        } else {
            var cssY = getComputedStyle(document.documentElement).getPropertyValue('--rotate-y').replace("deg", "") - differenceX * -0.3;
        }

        var cssX = getComputedStyle(document.documentElement).getPropertyValue('--rotate-x').replace("deg", "") - differenceY * 0.3;
        document.documentElement.style.setProperty('--rotate-x', cssX + "deg");
        document.documentElement.style.setProperty('--rotate-y', cssY + "deg");

        document.querySelector("#slider1").value = Math.round(cssX);
        document.querySelector("#number1").value = Math.round(cssX);
        document.querySelector("#slider2").value = Math.round(cssY);
        document.querySelector("#number2").value = Math.round(cssY);
    }

    function MouseUp() {

        localStorage.setting = 1;

        document.removeEventListener("mousemove", MouseMove);

    };

    document.addEventListener("mousemove", MouseMove);

    drag.onmouseup = MouseUp;
    drag.onmouseleave = MouseUp;


}

drag.onmousedown = MouseDown;

drag.ondragstart = function () {

    return false;

}

function zoom(event) {
    event.preventDefault();

    scale += event.deltaY * -0.001;

    scale = (Math.min(Math.max(.5, scale), 3));

    //  let scale2 = document.querySelector("#slider4").value + scale;

    const cssScale = scale.toFixed(2);
    document.documentElement.style.setProperty('--creeper-size', cssScale);

    document.querySelector("#slider4").value = Math.round(cssScale * 100);
    document.querySelector("#number4").value = Math.round(cssScale * 100);

}

let scale = 1;
const wheel = document.querySelector(".outer");
wheel.onwheel = zoom;
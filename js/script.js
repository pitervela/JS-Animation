const EASE = {
    oQuad: Quad.easeOut,
    iQuad: Quad.easeIn,
    ioQuad: Quad.easeInOut,
    oBack: Back.easeOut,
    oQuart: Quart.easeOut,
    ioCubic: Cubic.easeInOut,
    iBack: Back.easeIn,
    iExpo: Expo.easeIn,
    iCirc: Circ.easeIn,
};

const red = document.querySelector("#red .card");
const orange = document.querySelector("#orange .card");

// FLoat animation class

class Float {
    constructor(element) {
        this.flame = 0;
        this.element = element;
        this.isFloating = false;
    }
    play() {
        this.isFloating = true;
        gsap.ticker.add(this.update.bind(this));
    }
    stop() {
        this.isFloating = false;
    }
    resume() {
        this.isFloating = true;
    }
    update() {
        if (this.isFloating) {
            if (this.element.parentElement.id === "red") {
                const i = 2 * Math.sin(0.025 * this.flame),
                    n = -20 + 4 * Math.cos(0.02 * this.flame + Math.PI),
                    s = 12 + 2 * Math.sin(0.012 * this.flame),
                    a = 26 + 4 * Math.cos(0.01 * this.flame + Math.PI);
                this.element.style.transform = `translate(${i}%, ${n}%) rotate(-8deg) rotateX(${s}deg) rotateY(${a}deg)`;
            }
            if (this.element.parentElement.id === "orange") {
                const i = 2 * Math.sin(0.025 * this.flame),
                    n = -17 + 4 * Math.cos(0.02 * this.flame + Math.PI),
                    s = 12 + 2 * Math.sin(0.012 * this.flame),
                    a = -22 + 4 * Math.cos(0.01 * this.flame + Math.PI);
                this.element.style.transform = `translate(${i}px, ${n}px) rotateY(${a}deg) rotateX(${s}deg)`;
            }
            this.flame++;
        }
    }
}

const redFloat = new Float(red);
const orangeFloat = new Float(orange);
//set init state of the box and cards
const setInitState = () => {
    gsap.set("#cta", {
        transform: "translateX(-6%)",
        clipPath: "inset(0 100% 0 0)",
    });

    gsap.set("#box", {
        transform: "translate3d(81%, 0, 120px) rotateY(-86deg)",
    });
    gsap.set("#red", { opacity: 0 });
    gsap.set("#orange", { opacity: 0 });
    gsap.set("#plus", { scale: 0 });
};

//first loading animation
const landingAnim = function () {
    setInitState();
    gsap.to("#c0", {
        scale: 1.07,
        duration: 2,
        transform: "translate3d(-50%, -50%, 0) ",
        ease: Linear.easeInOut,
        onStart: () => {
            gsap.ticker.fps(60);
        },
        onComplete: secondFallAnim,
    });
};

//card drop animation
const secondFallAnim = () => {
    document.querySelector("#c0").style.visibility = "hidden";
    document.querySelector("#content").style.visibility = "visible";

    gsap.to("#f0", {
        clipPath: "polygon(0% 100%, 0% 75.6%, 100% 81.8%, 100% 100%, 0% 100%)",
        duration: 0.25,
    });
    gsap.to(".o", {
        opacity: 1,
        duration: 0.25,
        ease: EASE.iQuad,
    });

    directBtnAnim();
    boxEntranceAnim();
    redCardEntranceAnim();
    cardDropAnim();
    gsap.delayedCall(5, () => {
        redCardSmallAnim();
    });
    gsap.delayedCall(10, () => {
        redFloat.stop();
        orangeFloat.stop();
        document.querySelector("#stage").addEventListener("mouseenter", () => {
            console.log("enter");
            redFloat.resume();
            orangeFloat.resume();
            enterBtnAnim();
        });
        document.querySelector("#stage").addEventListener("mouseleave", () => {
            console.log("leave");
            redFloat.stop();
            orangeFloat.stop();
        });
    });
};

//entrance button animation
const directBtnAnim = () => {
    gsap.to("#cta", {
        transform: "translateX(2%)",
        clipPath: "inset(0 0% 0 0)",
        duration: 0.25,
        onComplete: () => {
            gsap.to("#cta svg", {
                transform: "translateX(50%)",
                opacity: 0,
                duration: 0.25,
                onComplete: () => {
                    gsap.to("#cta", {
                        transform: "translateX(0%)",
                        // opacity: 0,
                        duration: 0.25,
                        ease: EASE.ioQuad,
                        onComplete: () => {
                            gsap.to("#cta svg", {
                                transform: "translateX(-50%)",
                                opacity: 0,
                                duration: 0,
                                ease: EASE.ioQuad,
                                onComplete: () => {
                                    gsap.to("#cta svg", {
                                        transform: "translateX(0%)",
                                        opacity: 1,
                                        duration: 0.25,
                                        ease: EASE.ioQuad,
                                        onComplete: () => {},
                                    });
                                },
                            });
                        },
                    });
                },
            });
        },
    });
};
//mouse enter button animation
const enterBtnAnim = () => {
    gsap.to("#cta", {
        scale: 1.1,
        duration: 0.25,
        repeat: 1,
        yoyo: true,
    });
    gsap.to("#cta svg", {
        transform: "translateX(50%)",
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
            gsap.to("#cta svg", {
                transform: "translateX(-50%)",
                opacity: 0,
                duration: 0,
                ease: EASE.ioQuad,
                onComplete: () => {
                    gsap.to("#cta svg", {
                        transform: "translateX(0%)",
                        opacity: 1,
                        duration: 0.25,
                        ease: EASE.ioQuad,
                        onComplete: () => {},
                    });
                },
            });
        },
    });
};

//box entrance animation
const boxEntranceAnim = () => {
    gsap.fromTo(
        "#box",
        { transform: "translate3d(81%, 0, 120px) rotateY(-86deg)" },
        {
            transform: "translate3d(-15%, 0, 33px) rotateY(-45deg)",
            duration: 0.3,
            onComplete: () => {
                bumpBoxAnim();
            },
        }
    );
};

//box bump animation
const bumpBoxAnim = () => {
    gsap.to("#box .box", {
        transform: "rotateZ(-4deg)",
        duration: 0.075,
        ease: EASE.oQuad,
        onComplete: () => {
            gsap.to("#box .box", {
                transform: "rotateZ(0deg)",
                duration: 0.225,
                ease: EASE.iQuad,
            });
        },
    });
};

//red card entrance animation
const redCardEntranceAnim = () => {
    gsap.to("#red", {
        opacity: 1,
        duration: 0.2,
        ease: EASE.iQuad,
    });

    gsap.fromTo(
        "#red",
        { transform: "translate3d(-120%, 0, -150px)" },
        {
            transform: "translate3d(0, 0, 0)",
            duration: 0.27,
            ease: EASE.iQuad,
            onComplete: () => {
                gsap.to("#red", {
                    transform: "translate3d(20%, 0, 30px)",
                    duration: 0.03,
                    ease: EASE.oQuad,
                });
                gsap.to("#red .card", {
                    transform:
                        "translate3d(0, -23%, 0)  rotateY(26deg) rotateX(12deg)",
                    duration: 0.03, //0.27
                    ease: EASE.oQuad, //iquad
                    onComplete: () => {
                        redFloat.play();
                    },
                });
            },
        }
    );

    gsap.fromTo(
        "#red .card",
        { transform: "translate3d(0, -80%, 0)" },
        {
            transform: "translate3d(0, 0, 0) rotateY(26deg) rotateX(12deg)",
            duration: 0.27,
            ease: EASE.iQuad,
        }
    );
};

//cards drop animation
const cardDropAnim = () => {
    const fallCards = document.querySelectorAll("#cards div");

    fallCards.forEach((card) => {
        card.r = Math.random();
    });

    let i = 0;

    const loop = () => {
        if (i === 7) {
            return;
        }
        gsap.fromTo(
            fallCards[i],
            {
                opacity: 1,
                transform: `translate3d(66%, -360%, -20px) 
                rotateY(${fallCards[i].r * 20 - 10}deg)
                rotateX(${fallCards[i].r * 20 + 3}deg)
                rotateZ(${fallCards[i].r * 40 - 20}deg)`,
            },
            {
                opacity: 0.8,
                transform: `translate3d(14%, 0, -60px)`,
                duration: 2,
                delay: i === 0 ? 0 : Math.random() * 0.2 + 0.3,
                ease: EASE.ioCubic,
                onStart: () => {
                    fallCards[i].style.opacity = 1;
                    i++;
                    loop();
                    gsap.delayedCall(1, () => {
                        bumpBoxAnim();
                    });
                },
            }
        );
    };
    loop();
};

// make  red card small
const redCardSmallAnim = () => {
    //redcardmove, orangecardentrance, and box smaller

    gsap.fromTo(
        "#box",
        {
            transform: "translate3d(-15%, 0px, 33px) rotateY(-45deg)",
        },
        {
            transform: "translate3d(0, 0, 0) rotateY(-51deg)",
            duration: 0.4,
            ease: EASE.ioQuad,
        }
    );
    gsap.fromTo(
        "#red",
        {
            transform: "translate3d(-15%, 0, 15px)",
        },
        {
            transform: "translate3d(-88%, 0, -110px)",
            duration: 0.264,
            ease: EASE.ioQuad,
        }
    );
    gsap.fromTo(
        "#orange",
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 0.04,
            ease: EASE.iQuad,
        }
    );
    gsap.fromTo(
        "#orange",
        {
            transform: "translate3d(22%, 0, 5px)",
        },
        {
            transform: "translate3d(48%, 0, -110px)",
            duration: 0.264,
            ease: EASE.oQuad,
        }
    );
    gsap.fromTo(
        "#orange .card",
        {
            transform: "translate3d(0, -20, 0) rotateY(26deg) rotateX(12deg)",
        },
        {
            transform: "translate3d(0, -40, 0) rotateY(-32deg) rotateX(16deg)",
            duration: 0.264,
            ease: EASE.oQuad,
        }
    );
    gsap.fromTo(
        "#orange .shadow",
        {
            transform: "translateY(0%) rotateX(90deg) rotateZ(-19deg)",
        },
        {
            transform: "translateY(-20%) rotateX(90deg) rotateZ(14deg)",
            duration: 0.264,
            ease: EASE.oQuad,
        }
    );

    gsap.delayedCall(0.264, () => {
        gsap.fromTo(
            "#red",
            {
                transform: "translate3d(-88%, 0, -110px)",
            },
            {
                transform: "translate3d(-75%, 0, -110px) ",
                duration: 0.136,
                ease: EASE.ioQuad,
            }
        );
        gsap.fromTo(
            "#red .card",
            {
                transform:
                    "translate3d(0, -20%, 0) rotateY(26deg) rotateX(12deg)",
            },
            {
                transform:
                    "translate3d(0, -20%, 0) rotateY(43deg) rotateX(12deg)",
                duration: 0.136,
                ease: EASE.ioQuad,
            }
        );
        gsap.fromTo(
            "#red .shadow",
            {
                transform: "rotateX(90deg) rotateZ(-19deg)",
            },
            {
                transform: "rotateX(90deg) rotateZ(-27deg)",
                duration: 0.136,
                ease: EASE.ioQuad,
            }
        );
        gsap.fromTo(
            "#orange",
            {
                transform: "translate3d(48%, 0, -110px)",
            },
            {
                transform: "translate3d(35%, 0, -20px)",
                duration: 0.136,
                ease: EASE.ioQuad,
            }
        );
        gsap.fromTo(
            "#orange .card",
            {
                transform:
                    "translate3d(0, -40%, 0) rotateY(-32deg) rotateX(16deg)",
            },
            {
                transform:
                    "translate3d(0, -20%, 0) rotateY(-22deg) rotateX(12deg)",
                duration: 0.136,
                ease: EASE.ioQuad,
                onComplete: () => {
                    orangeFloat.play();
                },
            }
        );
        gsap.fromTo(
            "#orange .shadow",
            {
                transform: "translateY(-20%) rotateX(90deg) rotateZ(14deg)",
            },
            {
                transform: "translateY(0%) rotateX(90deg) rotateZ(9deg)",
                duration: 0.136,
                ease: EASE.ioQuad,
            }
        );
    });
    gsap.delayedCall(0.15, () => {
        gsap.to("#plus", {
            scale: 1.1,
            duration: 0.25,
            ease: EASE.oQuad,
        });
    });
    gsap.delayedCall(0.4, () => {
        gsap.to("#plus", {
            scale: 1,
            duration: 0.35,
            ease: EASE.ioQuad,
            onComplete: () => {
                cardDropAnim();
            },
        });
    });
};

landingAnim();

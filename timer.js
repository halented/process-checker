const main = document.getElementById('main');
let instrs;
let timerIsRunning = false;
let interval;

function addInstrs() {
    for (let i = 0; i < instrs.length; i++) {
        let div = document.createElement('div')
        div.className = 'timerbox'
        let lbl = document.createElement('div')
        lbl.innerText = instrs[i]
        let timer = document.createElement('p')
        timer.innerText = 0
        timer.id = `${instrs[i]} timer`
        timer.className = 'timer'

        let start = document.createElement('button')
        start.innerText = `Start ${instrs[i]}`
        start.id = `${instrs[i]} start`
        start.addEventListener("click", () => startTimer(instrs[i]))

        let end = document.createElement('button')
        end.innerText = "End"
        end.id = `${instrs[i]} end`
        end.className = 'hidey'
        end.addEventListener("click", () => endTimer(instrs[i]))

        div.appendChild(lbl)
        div.appendChild(timer)
        div.appendChild(start)
        div.appendChild(end)
        main.appendChild(div)
    }
    let endMeeting = document.createElement('button')
    endMeeting.innerText = 'End Meeting!'
    endMeeting.addEventListener('click', endTheMeeting)
    main.prepend(endMeeting)
}

function startTimer(inst) {
    if (timerIsRunning) {
        bigAngryRedAlert()
    }
    else {
        // start timer
        let timerInQuestion = document.getElementById(`${inst} timer`)
        interval = setInterval(() => {
            let current = parseInt(timerInQuestion.innerText)
            timerInQuestion.innerText = current + 1
        }, 1000);

        // switch which button is showing
        let start = document.getElementById(`${inst} start`)
        start.className = 'hidey'
        let end = document.getElementById(`${inst} end`)
        end.className = ''

        timerIsRunning = true
    }

}

function endTimer(inst) {
    // switch which button is showing
    let start = document.getElementById(`${inst} start`)
    start.className = ''
    let end = document.getElementById(`${inst} end`)
    end.className = 'hidey'

    timerIsRunning = false

    // stop timer
    clearInterval(interval)
}

function bigAngryRedAlert(){
    let h1 = document.createElement('h1')
    h1.style = "color: red"
    h1.innerText = "ONLY ONE TIMER AT A TIME >:-("
    main.prepend(h1)
    setTimeout(function(){ main.removeChild(h1)}, 2500);
}

function addForm(){
    let form = document.createElement('form')
    let lbl = document.createElement('label')
    lbl.innerText = "Please Enter Names of Attendees, Separated by Commas"
    let input = document.createElement('input')
    input.placeholder = "leia, roxane, beyonce..."
    input.name = "names"
    let sbmt = document.createElement('button')
    sbmt.innerText = "Create Timers"
    sbmt.type = 'submit'

    form.addEventListener('submit', (ev)=> createTimers(ev))

    form.appendChild(lbl)
    form.appendChild(input)
    form.appendChild(sbmt)

    main.appendChild(form)
}

function createTimers(ev){
    ev.preventDefault()
    instrs = ev.target.names.value.split(",")
    main.innerText = ''
    addInstrs()
}

function endTheMeeting(){
    let timers = document.getElementsByClassName("timer")
    let buttons = document.getElementsByTagName('button')
    for (let i = 0; i < buttons.length; i++) {
        // hide all buttons
        buttons[i].className = 'hidey'
    }
    for (let i = 0; i < timers.length; i++) {
        // turn all timers to minutes
        let count = parseInt(timers[i].innerText)/60
        timers[i].innerText = `${count} minute(s)`
    }

}

addForm()
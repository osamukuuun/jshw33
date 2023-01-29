// №9 Практика, створення сайту з нотатками

let notesHtml = document.querySelector('#notes')
let btnPost = document.querySelector('#btnPost')
let inputs = {
    title: document.querySelector('#inputTitle'),
    text: document.querySelector('#inputText'),
    color: document.querySelector('#inputColor'),
    clearInput(){
        this.title.value = null
        this.text.value = null
    },
    getInfo(){
        if(this.title.value.length != 0 && this.text.value.length != 0){
            return {
                title: this.title.value,
                text: this.text.value,
                color: this.color.value
            }
        } else {
            return null
        }
    }
}

let notesStore = [
    {
        id: 1,
        title: 'Title 1',
        text: 'Зробити дз',
        color: '#fff',
        timeCreated:{
            hours: 10,
            minutes: 20,
            seconds: 25
        }
    }
]

let btnsDelete = []
let btnsChange = []

let generateNotes = () => {
    notesHtml.innerHTML = null
    notesStore.map((el,index) => {
        if(!el.statusDelete){
            notesHtml.innerHTML += `
            <div class="noteBlock" id="note$(index)" style="background:${el.color}">
            <h2>${el.title}</h2>
            <p id="noteText$(index)">${el.text}</p>
            <p class="time">${el.timeCreated.hours}:${el.timeCreated.minutes}:${el.timeCreated.seconds}</p>
            <button id="btnChange${index}"><img class="icon" src="./edit.svg" alt="change"/></button>
            <button class="btnDelete" id="btnDel${index}">Delete</button>
            </div>
            `
        }
    })
    for(let i=0;i<=notesStore.length-1;i++){
        if(!notesStore[i].statusDelete){
            btnsDelete[i] = document.querySelector(`#btnDel${i}`)
            btnsDelete[i].addEventListener('click', () => {
                notesStore[i].statusDelete = true
                generateNotes()
            })

            btnsChange[i] = document.querySelector(`#btnChange${i}`)
            btnsChange[i].addEventListener('click', () => {
                document.querySelector(`#noteText${i}`).innerHTML =`
                <textarea id="textarea${i}" placeholder="Write new text"></textarea>
                `
                btnsChange[i].innerHTML = `<button id="btnSave${i}"><img class="icon" src="./save.svg" alt="change"/></button>`
                document.querySelector(`#btnSave${i}`).addEventListener(
                    'click',
                    ()=> {
                        let newText = document.querySelector(`#textarea${i}`).value
                        if (newText.length != 0){
                            notesStore[i].text = newText
                        }
                        console.log(notesStore)
                       generateNotes()
                    }
                )
            })
        }
    }
    console.log(btnsDelete)
}

let  getCurrentTime = () => {
    let time = new Date()
    return {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
    }
}
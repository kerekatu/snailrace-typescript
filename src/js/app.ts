// ! RESET NOT IMPLEMENTED
// ! EVENT LISTENER NOT CLEARED
// ! NO BEST SCORE
// ! SOME ERROR BOUNDARIES ARE NOT SET (e.g. players can choose the same button)
// ! COUNTDOWN TO MATCH START

const inputControl = document.querySelector(
  '#race-input-control'
) as HTMLInputElement
const inputName = document.querySelector('#race-input-name') as HTMLInputElement
const buttonAdd = document.querySelector('#race-btn-add') as HTMLButtonElement
const buttonStart = document.querySelector(
  '#race-btn-start'
) as HTMLButtonElement
let currentId = 1

class SnailManager {
  snailList: any[]
  started: boolean
  matchFinished: boolean

  constructor() {
    this.snailList = []
    this.started = false
    this.matchFinished = false
  }

  moveSnail = () => {
    console.log('match has started')
    snailAdd.snailList.forEach((snail) => {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === snail.control && snail.progress < 80) {
          snail.progress += 2
          const snailElement = document.querySelector(
            '#snail-' + snail.id
          ) as HTMLElement
          snailElement.style.left = snail.progress.toString() + 'rem'
          this.started = true
        } else if (snail.progress === 80 && !snail.finished) {
          snail.finished = true
          this.matchFinished = true
          alert(snail.name + ' has won the snail race!')
        } else if (this.matchFinished) {
          const buttonReset = document.createElement(
            'button'
          ) as HTMLButtonElement
          buttonReset.id = 'btn-race-reset'
          buttonReset.className = 'race__btn'
          buttonReset.innerHTML = 'Reset'
          document.querySelector('.race__control').appendChild(buttonReset)
        }
      })
    })
  }

  createSnail = (id: number) => {
    if (inputControl.value && inputName.value && currentId <= 6) {
      let snail = new Snail(
        id,
        inputName.value,
        `url(./src/img/snail${id}.png)`,
        +inputControl.value
      )
      this.snailList = [...this.snailList, snail]
      console.log(this.snailList)

      const snailElement = document.createElement('div')
      snailElement.id = 'snail-' + snail.id.toString()
      snailElement.className = 'race__snail'
      snailElement.style.backgroundImage = snail.img
      document.querySelector('#race-way').appendChild(snailElement)

      const nameTag = document.createElement('h3')
      nameTag.className = 'race__nametag'
      nameTag.innerHTML = snail.name
      snailElement.appendChild(nameTag)

      inputControl.value = null
      inputName.value = null
    }
  }
}

const snailAdd = new SnailManager()

class Snail {
  id: number
  name: string
  img: string
  control: number
  finished: boolean = false
  progress: number = 0

  constructor(id: number, name: string, img: string, control: number) {
    this.id = id
    this.name = name
    this.img = img
    this.control = control
  }
}

inputControl.addEventListener('keyup', (e) => {
  inputControl.value = e.keyCode.toString()
})

buttonAdd.addEventListener('click', () => {
  if (inputControl.value && inputName.value && !snailAdd.started) {
    snailAdd.createSnail(currentId++)
  }
})

buttonStart.addEventListener(
  'click',
  () => !snailAdd.started && snailAdd.moveSnail()
)

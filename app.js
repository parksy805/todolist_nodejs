const express = require('express')
const app = express()
const port = 3000
let toDoLists = ['밥먹기']

app.set('view engine','pug')

app.use(express.static('public')) // 갑자기 추가;;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//(?1)위 소스 기능 검색

app.get('/', (req, res) => { //(?2)res.render 기능 : render(화면단 파일 이름, json타입)인듯
    res.render('index', {toDoListTitle : '오늘의 할 일 : ' + toDoLists.length, toDoLists : toDoLists})
})

app.post('/add_list', (req, res) => {
    const newContent = req.body.content
    console.log(newContent + ' <추가')
    toDoLists.push(newContent)
    res.redirect('/')
})

app.get('/delete_list/:id', (req, res) => {
    const deleteContent = req.params.id
    //index.pug의 val을 id로 가져옴
    console.log(deleteContent + ' <삭제')
    toDoLists = toDoLists.filter((value) => value != deleteContent)
    // filter함수로 != 아닌 것만 다시 List에 담음
    res.redirect('/')
})

app.get("/open_update/:id", (req, res) => { //화면이동
    res.render('update', {prevContent: req.params.id})
})

app.post("/update_list", (req, res) => {
    let prevContent = req.body.prevContent
    let newContent = req.body.newContent
    let index = toDoLists.indexOf(prevContent)
    toDoLists.splice(index, 1, newContent)
    console.log(prevContent + '을(를)' + newContent + '(으)로 수정')
    res.redirect('/')
})

// 아래 소스는 항상 마지막에 위치
app.listen(port, () => {
    console.log('connected_terminal')
})
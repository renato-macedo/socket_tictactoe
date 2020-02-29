window.onload = async () => {
  const resp = await fetch('/rooms')
  const data = await resp.json()
  console.log(data)
  const html = data.rooms.reduce((prev, room) => prev + `<li> ${room.id} clients: ${room.clients.length} `, '')
  document.getElementById('rooms').innerHTML
    = html

}

document.getElementById('enter').addEventListener('click', e => {
  EnterRoom('renato', true)
})

function EnterRoom(nickname, createRoom = false) {

  const type = createRoom ? 'create' : 'join'
  const ws = new WebSocket("ws://localhost:3000/ws")
  ws.onopen = event => ws.send(JSON.stringify({ type, payload: nickname }))
  //ws.onopen = event => ws.send("Olá");
  ws.send
  ws.onmessage = event => {
    const data = JSON.parse(event.data)
    console.log(data)
    if (data) {

      document.getElementById("rooms").innerHTML = document.getElementById("rooms").innerHTML + `<li> ${data.payload} `
    }
  }
  ws.onerror = error => console.log("Socket Error:", error)
}
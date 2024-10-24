



async function passInfo(){
    let html = `<table>
    <tr>
    <th>${data.pic}<th>
    </tr>

        <tr>
        <td>${data.firstName}${data.lastName}<td>
        <td>${data.price}<td>
        <td>${data.sport}<td>
        <td>${data.rating}<td>
        </tr>`
   
    document.getElementById("data").innerHTML = html

}
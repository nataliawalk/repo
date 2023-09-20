function moveRight() {
    document.getElementById('boxInside').className = 'moveRight';
    document.getElementById('dineIn').style.color = 'white';
    document.getElementById('takeAway').style.color = '';
    document.getElementById('dineIn').style.cursor = 'default';
    document.getElementById('takeAway').style.cursor = 'pointer';
}

function moveLeft() {
    document.getElementById('boxInside').className = 'moveLeft';
    document.getElementById('takeAway').style.color = 'white';
    document.getElementById('dineIn').style.color = 'black';
    document.getElementById('dineIn').style.cursor = 'pointer';
    document.getElementById('takeAway').style.cursor = 'default';
}
import './style.css';
import gameloop from './gameloop'

const player1Container = document.querySelector('.board1')
const player2Container = document.querySelector('.board2')
const messageContainer = document.querySelector('.messages')

gameloop(player1Container, player2Container, messageContainer)

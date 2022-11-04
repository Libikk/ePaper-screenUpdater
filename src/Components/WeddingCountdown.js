import React from 'react'
import { assetsPath } from '../rootDir';
import '../styles/weddingCountdown.scss';

const WeddingCountdown = () => {
    const weddingDate = new Date('2023-04-22T07:53:36.603Z')
    const daysLeft = Math.floor((weddingDate - new Date()) / (1000 * 60 * 60 * 24))
    const monthsAndDaysLeft = Math.floor((weddingDate - new Date()) / (1000 * 60 * 60 * 24 * 30)) + ' months and ' + Math.floor((weddingDate - new Date()) / (1000 * 60 * 60 * 24)) % 30 + ' days'

    return <div className="wedding-container">
        {/* <div className='wedding-title'>Wedding in</div> */}
        <div>
        <img src={`${assetsPath}/weddingicon.png`} alt="kurwa" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="wedding-total-days">{daysLeft} days left</div>
        <div className="wedding-months">({monthsAndDaysLeft})</div>
    </div>
}

export default WeddingCountdown
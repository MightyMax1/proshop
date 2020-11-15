import React from 'react'
import PropTypes from 'prop-types'


const Rating = ({ value, text, color }) => {

    const showStars = (value) => {
        let showStars = [];
        for (let i = 0; i < 5; i++) {
            showStars.push(
                <span key={i + 1}>
                    <i style={{ color }} className={
                        value >= i + 1 ?
                            'fas fa-star' : value >= (i + 0.5) ?
                                'fas fa-star-half-alt' : 'far fa-star'
                    }></i>
                </span>)
        }
        return showStars;
    }

    return (
        <div className='rating'>
            {showStars(value)} {text}
        </div>
    )
}

Rating.defaultProps = {
    color: '#e6e600'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating

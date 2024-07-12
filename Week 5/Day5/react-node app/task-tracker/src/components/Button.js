import PropTypes from 'prop-types'

export default function Button(props) {

  return (
    <button onClick={props.onClick} className='btn' style={{backgroundColor: props.color }}>{props.text}</button>
  )
}

Button.defaultProps = {
    color: 'steelblue',
    }

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}


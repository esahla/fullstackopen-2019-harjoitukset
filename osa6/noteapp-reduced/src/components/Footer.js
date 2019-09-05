import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 12
  }

  return (
    <div style={footerStyle}>
      <br />
      <hr />
      <em>Note app, esahla, 2019</em>
    </div>
  )
}

export default Footer
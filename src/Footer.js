import React from 'react'

const Footer = ({length}) => {
    const year = new Date();
  return (
    <footer>List of {length ===1 ? "Item":"Items"}: {length}</footer>
  )
}
 
export default Footer 
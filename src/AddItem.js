import React from 'react'
import { FaPlus } from 'react-icons/fa'
import {useRef} from 'react'
const AddItem = ({newItem, setNewItem, handleSubmit}) => 
{
  const iRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor="addItem">ADD ITEM</label>
        <input 
            autoFocus
            ref={iRef}
            type="text" 
            id="addItem" 
            placeholder='Add Item'
            value = {newItem}
            onChange={(e) => setNewItem(e.target.value)} 
            required
        />
        <button
            type ="submit"
            aria-label='Add Item'
            onClick={() => iRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem
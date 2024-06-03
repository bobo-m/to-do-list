import './DropdownTimePicker.css';
const DropdownTimePicker = ({date}) => {
  const [dropdown, setDropdown] = useState(false);

  return(
    <>
    <input className="timeSelectionInput" type="text" onClick={toggleDropdown}/>  
    {dropdown && 
      <div className="dropdown">
        
      </div>
    }
    </>
  );
};
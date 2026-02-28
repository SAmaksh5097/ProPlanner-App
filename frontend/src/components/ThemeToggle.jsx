import {Moon, Sun} from 'lucide-react'
import { useTheme } from '../context/ThemeContext';
const ThemeToggle = () => {
    const {theme, toggle} = useTheme();

  return (
    <div className='flex'>
        <button className="rounded  border-gray-400 dark:border-gray-400 cursor-pointer shadow-mdhover:shadow-gray-600 transition-all ease-in-out" onClick={toggle}>
            {theme==="light"?<Moon className={`h-6 w-6  `}/>:<Sun className={`h-6 w-6`}/>}
        </button>

      
    </div>
  )
}

export default ThemeToggle
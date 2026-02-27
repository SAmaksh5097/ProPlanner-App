import React, { use, useEffect, useState } from 'react'
import {Moon, Sun} from 'lucide-react'

const ThemeToggle = () => {
    const [theme,setTheme] = useState("dark")
    const toggle = ()=>{
        const newtheme = theme==="light"?"dark":"light"
        setTheme(newtheme)
        setSpin(true)
        setTimeout(() => {
            setSpin(false)
        }, 600);
  }

  useEffect(()=>{
    document.documentElement.classList.toggle("dark",theme==="dark");
  },[theme])

  const [spin,setSpin] = useState(false)

  return (
    <div className='flex'>
        <button className="rounded  border-gray-400 dark:border-gray-400 cursor-pointer shadow-mdhover:shadow-gray-600 transition-all ease-in-out" onClick={toggle}>
            {theme==="light"?<Moon className={`h-6 w-6 ${spin?"animate-spin":""} `}/>:<Sun className={`h-6 w-6 ${spin?"animate-spin":""} `}/>}
        </button>

      
    </div>
  )
}

export default ThemeToggle
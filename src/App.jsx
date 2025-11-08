import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)


  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=14`)
    setUserData(response.data)
  }

  useEffect(() => {
    getData()
  }, [userData, index])

  let printData = <h3 className='text-center text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Loading...</h3>
  if (userData.length > 0) {
    printData = userData.map((user, idx) => {
      return <div key={idx} className="">
        <a href={user.url}>
          <div className="h-40 w-44 overflow-hidden bg-white rounded-2xl" >
            <img src={user.download_url} className="h-full w-full object-cover" alt="" />
          </div>
          <h1 className='font-bold text-lg'>{user.author}</h1>
        </a>
      </div>
    })
  }
  return (
    <div className='bg-black h-screen p-4 text-white overflow-auto'>
      {/* <h1 className='fixed text-6xl bg-gray-900/90 backdrop-blur px-4 py-2 rounded-2xl '>{`Gallery - Page ${index}`}</h1> */}
      {/* <button
        onClick={getData}
        className='bg-green-600 active:scale-95 px-5 py-2 rounded text-white'>Open gallery
      </button> */}
      <div className="flex h-[82%] flex-wrap gap-4 mt-20 p-2">
        {printData}
      </div>


      <div className="flex justify-center gap-6 mt-4 items-center">
        <button
          disabled={index < 2}
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1)
              setUserData([])
            }
          }}
          className='bg-amber-400 text-black text-sm cursor-pointer active:scale-95 px-4 py-2 font-semibold rounded-lg'>
          Prev
        </button>
        <div className="">Page - {index}</div>
        <button
          onClick={() => {
            setIndex(index + 1)
            setUserData([])
          }}
          className='bg-amber-400 text-black text-sm cursor-pointer active:scale-95 px-4 py-2 font-semibold rounded-lg'>
          Next
        </button>
      </div>
    </div>


  )
}

export default App
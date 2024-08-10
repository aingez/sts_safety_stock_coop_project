import React from 'react'

function SearchPage() {
  return (
    <div>
      <h1 className='text-5xl pb-5 font-bold'>
        Search Part
      </h1>

      <form action="/send-data-here" method="post">
        <ul>
          <li className='pb-2'>
            <label for="first">Part Type</label>
            <input className='bg-slate-200' type="text" id="first" name="first" />
          </li>
          <li className='pb-2'>
            <label for="first">Serial</label>
            <input className='bg-slate-200' type="text" id="first" name="first" />
          </li>
        </ul>
      </form>

      <button className='mx-1 bg-rose-600 hover:bg-rose-400 text-white font-bold py-1 px-4 border-b-4 border-rose-700 hover:border-rose-500 rounded'>Clear</button>
        <button className='mx-1 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-1 px-4 border-b-4 border-cyan-700 hover:border-cyan-500 rounded' type="submit">Search</button>

    </div>
  )
}

export default SearchPage

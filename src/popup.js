import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom';
import './assets/popup.css'

const Popup = () => {

  const [token,setToken]=useState('');
  const [expired,setExpired]=useState('');

  const authenticate = async () => {
    try {
      const loginFormData = new FormData();
      loginFormData.append("username", "kabbogor")
      loginFormData.append("password", "bogorpancakarsa")
      let response = await axios.post('http://bogor.atisisbada.id/penerimaan2022/api_v2.php?Pg=Login',loginFormData);
      //console.log(response);
      setToken(response.data.token);
      setExpired(response.data.expire);
    } catch (error) {

    }
  }

  useEffect(() => {
    authenticate();
  }, [])

  return (
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img class="mx-auto h-20 w-auto" src="http://diskominfo.bogorkab.go.id/wp-content/uploads/2017/02/cropped-logo-pemkab-bogor.png" alt="Workflow" />
          <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Cari BAST</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Input Parameter Pencarian
            {expired}
          </p>
        </div>
        <form class="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            {/* <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
          </div> */}
            <div>
              <label for="kode_skpd" class="sr-only">SKPD</label>
              <select id="kode_skpd" name='kode_skpd' required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                <option value='1.0.1.1'>DINAS PENDIDIKAN</option>
                <option value='1.0.1.2'>DINAS KESEHATAN</option>
              </select>

            </div>
          </div>



          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

              CARI
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

render(<Popup />, document.getElementById('root'));
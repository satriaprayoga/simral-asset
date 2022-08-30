import axios from 'axios';
import React, { useEffect, useState, CSSProperties } from 'react'
import { render } from 'react-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { PulseLoader } from 'react-spinners';
import './assets/popup.css'
import skpd from './skpd';

const override
 = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Popup = () => {

  const [token,setToken]=useState('');
  const [expired,setExpired]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [errorMsg,setErrorMsg]=useState('');

  const authenticate = async () => {
    setLoading(true);
    try {
      const loginFormData = new FormData();
      loginFormData.append("username", "kabbogor")
      loginFormData.append("password", "bogorpancakarsa")
      let response = await axios.post('http://bogor.atisisbada.id/penerimaan2022/api_v2.php?Pg=Login',loginFormData);
      //console.log(response);
      setToken(response.data.token);
      setExpired(response.data.expire);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      setError(true);
      setErrorMsg(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    authenticate();
  }, [])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-20 w-auto" src="http://diskominfo.bogorkab.go.id/wp-content/uploads/2017/02/cropped-logo-pemkab-bogor.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Cari BAST</h2>
        </div>
        
        <div className='flex items-center justify-center'>
          <PulseLoader color='#ccc' loading={loading} cssOverride={override} size={20} />
        </div>
        {
          (!loading && !error)?
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(e)=>{e.preventDefault();setLoading(!loading)}}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* <div>
            <label for="email-address" className="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
          </div>
          <div>
            <label for="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
          </div> */}
            <div>
              <label for="kode_skpd" className="sr-only">SKPD</label>
              <select id="kode_skpd" name='kode_skpd' required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                {skpd.map((s)=>(
                  <option value={s.kode} key={s.kode}>{s.nama_skpd}</option>
                ))}
              </select>

            </div>
          </div>



          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

              Tampilkan BAST
            </button>
           
          </div>
        </form>
        :
        <div>
          <p className="mt-2 text-center text-sm text-gray-600">
            {errorMsg}
          </p>
        </div>
        }
        
      </div>
    </div>
  )
}

render(<Popup />, document.getElementById('root'));
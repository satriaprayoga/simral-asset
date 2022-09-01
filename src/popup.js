import axios from 'axios';
import React, { useEffect, useState, CSSProperties } from 'react'
import { render } from 'react-dom';
import { PulseLoader } from 'react-spinners';
import './assets/popup.css'
import skpd from './skpd';
import DataTable from 'react-data-table-component';
const override
  = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const columns = [
  {
    name: '#',
    selector: (row,index)=>index+1
},
  {
    name: 'No Dokumen Sumber',
    selector: row => row.no_dokumen_sumber,
    filterable: true,
  },
  {
    name: 'No Dokumen Kontrak',
    selector: row => row.nomor_dokumen_kontrak,
    filterable: true,
  },
  {
    name: 'No Penerimaan',
    selector: row => row.nomor_penerimaan,
    filterable: true,
  },
  {
    name: 'Tahun Anggaran',
    selector: row => row.tahun_anggaran,
  },
  {
    name: 'Tanggal Kontrak',
    selector: row => row.tanggal_dokumen_kontrak,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
]

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data.rincian_penerimaan, null, 2)}</pre>;

const Popup = () => {

  const [token, setToken] = useState('');
  const [expired, setExpired] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [kodeSkpd,setKodeSkpd]=useState('');
  const [basts,setBasts]=useState([])

  const authenticate = async () => {
    setLoading(true);
    try {
      const loginFormData = new FormData();
      loginFormData.append("username", "kabbogor")
      loginFormData.append("password", "bogorpancakarsa")
      let response = await axios.post('http://bogor.atisisbada.id/penerimaan2022/api_v2.php?Pg=Login', loginFormData);
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

  const submitBast=async (event)=>{
    event.preventDefault();
    setLoading(true);
    try {
      const bastForm=new URLSearchParams();
      bastForm.append('kode_skpd',kodeSkpd);
      let response=await axios({
        method: 'POST',
        url:'http://bogor.atisisbada.id/penerimaan2022/api_v2.php?Pg=bast_penerimaan',
        headers:{
          'Authorization': `Bearer ${token}`
        },
        data:bastForm
      })
      
      console.log(response.data.data);
      setBasts(response.data.data);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      setError(true);
      setErrorMsg(error.message);
    }
    setLoading(false)
  }

  const handleSkpdChange=event=>{
    console.log(event.target.value);
    setKodeSkpd(event.target.value);
  }

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
      
      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
        
        },
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
       
        },
      },
    },
  };

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
          (!loading && !error) ?
            <div>
              <form className="mt-8 space-y-6" action="#" onSubmit={submitBast}>
              
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
                    <label htmlFor="kode_skpd" className="sr-only">SKPD</label>
                    <select id="kode_skpd" name='kode_skpd' value={kodeSkpd} onChange={handleSkpdChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                      <option value="">--Pilih SKPD--</option>
                      {skpd.map((s) => (
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
              <div>
                <DataTable columns={columns} data={basts} customStyles={customStyles} expandableRows expandableRowsComponent={ExpandedComponent}/>
              </div>
            </div>
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
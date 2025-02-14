import axios from 'axios';
import React, { useEffect, useState } from 'react'

const CurrencyConvertor = () => {

  const [amount, setAmount] = useState("1"); // stores the amount user types. linked with the input box
  const [fromCurrency, setFromCurrency] = useState("USD") // stores the from currency 
  const [toCurrency, setToCurrency] = useState("PKR") // stores the to currency
  const [exchangeRate, setExchangeRate] = useState(null); // stores the rates of both currency
  const [convertedAmount, setConvertedAmount] = useState(null); // stores the converted amount
  const [currencies, setCurrencies] = useState([]); // stores the currency that is fetched from the api. you will see it in options

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`


  // making the logic of fetch currencies

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(API_URL);
        const rates = response.data.conversion_rates;
        setCurrencies(Object.keys(rates)); // this  will give data to the options
        setExchangeRate(rates[toCurrency]); // thsi is looking for the rates of the currency
        setConvertedAmount((amount * rates[toCurrency]).toFixed(2))  // Calculation and it will show only two numbers after decimal 
      } catch (error) {
        alert(error)
      }
     
    }
    fetchCurrencies();
  }, [fromCurrency, toCurrency, amount, API_URL]);

  // Making the handle btns for the jsx

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  }

  

  return (
    <>
      <main className='h-full w-full ' >
        <div className='flex min-h-screen justify-center items-center bg-[#3f3e3e]' >
          <div className="bg-[#ffffff79] p-8 rounded-lg shadow-lg sm:w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">From</label>
                <select onChange={handleFromCurrencyChange} value={fromCurrency} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">

                  {currencies.map((currency) => (
                    <option key={currency} value={currency} >{currency}</option>
                  ))}

                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <select onChange={handleToCurrencyChange} value={toCurrency} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {currencies.map((currency) => (
                    <option key={currency} value={currency} >{currency}</option>
                  ))}
                </select>
              </div>
              <div className="mt-6">
                <p className="text-lg font-semibold text-center"> {amount} {fromCurrency} = {convertedAmount} {toCurrency} </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default CurrencyConvertor

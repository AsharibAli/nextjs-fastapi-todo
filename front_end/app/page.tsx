'use client'
import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Contract, ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { Counter__factory } from '@/generated/contract-types'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

declare let window: any

const Home: NextPage = () => {
  const [address, setAddress] = useState<string>()
  const [balance, setBalance] = useState<string>()
  const [count, setCount] = useState<number>(0)
  const [number, setNumber] = useState<number>()
  const [time, setTime] = useState(Date.now())
  const COUNTER_ADDRESS = '0x478F61Ce2703157049F5D2E6bf488722c4bb3c92'
  // https://sepolia.etherscan.io/address/0x478f61ce2703157049f5d2e6bf488722c4bb3c92
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const provider = new ethers.providers.InfuraProvider('sepolia')
    const counter = Counter__factory.connect(COUNTER_ADDRESS, provider)
    if (counter) {
      counter.number().then((count) => {
        setCount(count.toNumber())
      })
    }
  }, [time])

  const handleConnectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    setAddress(await signer.getAddress())
    setBalance(ethers.utils.formatEther(await signer.getBalance()))
  }

  const handleRefresh = async () => {
    const provider = new ethers.providers.InfuraProvider('sepolia')
    const counter = Counter__factory.connect(COUNTER_ADDRESS, provider)
    const n = await counter.number()
    setCount(n.toNumber())
  }

  const handleIncrement = async () => {
    console.log('increment')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const counter = Counter__factory.connect(COUNTER_ADDRESS, signer)
    await counter.increment()
  }

  const handleSetNumber = async () => {
    console.log('set number')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = Counter__factory.connect(COUNTER_ADDRESS, signer)
    await contract.setNumber(number)
  }
  return (
    <div className="">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <a href="/" className="flex items-center">
            <Image
              src="/next.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Shadcn Logo"
              width={100}
              height={100}
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              DApp Demo
            </span>
          </a>
          {address ? (
            <>
              <div>{address}</div>
              <div>{balance}</div>
            </>
          ) : (
            <Button onClick={handleConnectWallet}>Connect Wallet</Button>
          )}
        </div>
      </nav>

      {/* Main content */}
      <div className="min-w-full min-h-full">
        <div className="container flex flex-col justify-center items-center space-y-5">
          <div className="text-3xl font-bold ">Counter {count}</div>
          <Button color="light" onClick={handleRefresh}>
            Refresh Counter
          </Button>

          <Card className="flex flex-col items-center justify-center space-y-4 p-4">
            <Button className="w-full">Increment Counter</Button>
          </Card>

          <Card className="flex flex-col items-center justify-center space-y-4 p-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="number" defaultValue="Set Number" />
              </div>
              <Input
                id="number"
                type="number"
                placeholder="Enter Initial Count Number"
                value={number}
                required={true}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <Button
                type="submit"
                onClick={handleSetNumber}
                className="w-full"
              >
                Submit
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Build with ❤️ by Asharib Ali
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400">
              About
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400">
              Licensing
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

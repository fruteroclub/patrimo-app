import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { formatEther, parseEther } from 'viem'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import Link from 'next/link'
import { ExternalLinkIcon, Plus } from 'lucide-react'
import { toast } from 'sonner'

// Contract ABIs
const PATRIMO_FACTORY_ABI = [
  {
    "inputs": [{ "name": "_investor", "type": "address" }],
    "name": "getInvestorPortfolios",
    "outputs": [{ "name": "", "type": "address[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "_advisor", "type": "address" }],
    "name": "createPortfolioManager",
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

const PORTFOLIO_MANAGER_ABI = [
  {
    "inputs": [{ "name": "asset", "type": "address" }, { "name": "amount", "type": "uint256" }],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [{ "name": "", "type": "address" }],
    "name": "assetBalances",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract addresses - should be environment variables
const PATRIMO_FACTORY_ADDRESS = process.env.NEXT_PUBLIC_PATRIMO_FACTORY_ADDRESS as `0x${string}`

// Mock verified advisors for demo
const VERIFIED_ADVISORS = [
  { address: '0x742D35Cc6641C9C4297C72b7C1AbAd95fFE23db5', name: 'Asesor Alpha' },
  { address: '0x8ba1f109551bD432803012645Hac136c01C96aF8', name: 'Asesor Beta' },
  { address: '0x97c5E4C4b05f0D32A50Bc6C4C5C8B9D6E8F7A123', name: 'Asesor Gamma' },
] as const

type DepositNativeTokenModalProps = {
  accountBalance: {
    data?: {
      decimals: number
      formatted: string
      symbol: string
      value: bigint
    }
  }
  chain?: {
    nativeCurrency: {
      symbol: string
    }
    blockExplorers?: {
      default: {
        name: string
      }
    }
  }
}

export default function DepositNativeTokenModal({
  accountBalance,
  chain,
}: DepositNativeTokenModalProps) {
  const { address } = useAccount()
  const [selectedAdvisor, setSelectedAdvisor] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [step, setStep] = useState<'check' | 'create' | 'deposit'>('check')
  const [isMounted, setIsMounted] = useState(false)

  // Get user's portfolios
  const { data: portfolios, refetch: refetchPortfolios } = useContractRead({
    address: PATRIMO_FACTORY_ADDRESS,
    abi: PATRIMO_FACTORY_ABI,
    functionName: 'getInvestorPortfolios',
    args: address ? [address] : undefined,
  })

  // Get portfolio balance if user has a portfolio
  const portfolioAddress = portfolios?.[0] as `0x${string}` | undefined
  const { data: portfolioBalance } = useContractRead({
    address: portfolioAddress,
    abi: PORTFOLIO_MANAGER_ABI,
    functionName: 'assetBalances',
    args: ['0x0000000000000000000000000000000000000000'], // ETH address
  })

  // Contract write hooks
  const { writeContract, data: hash, isPending } = useWriteContract()

  // Wait for transaction
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
    }
  }, [isMounted])

  useEffect(() => {
    if (portfolios && portfolios.length > 0) {
      setStep('deposit')
    } else if (address) {
      setStep('create')
    }
  }, [portfolios, address])

  useEffect(() => {
    if (isSuccess) {
      if (step === 'create') {
        toast.success('Portfolio creado exitosamente')
        refetchPortfolios()
        setStep('deposit')
      } else {
        toast.success('ETH depositado exitosamente')
        setDepositAmount('')
      }
    }
  }, [isSuccess, step, refetchPortfolios])

  const handleCreatePortfolio = () => {
    if (!selectedAdvisor) return

    writeContract({
      address: PATRIMO_FACTORY_ADDRESS,
      abi: PATRIMO_FACTORY_ABI,
      functionName: 'createPortfolioManager',
      args: [selectedAdvisor as `0x${string}`],
    })
  }

  const handleDeposit = () => {
    if (!depositAmount || !portfolioAddress) return

    const amount = parseFloat(depositAmount)
    const balance = parseFloat(formatEther(accountBalance.data?.value ?? BigInt(0)))

    if (amount > balance) {
      toast.warning("No tienes suficiente balance")
      return
    }

    const ethValue = parseEther(depositAmount)
    writeContract({
      address: portfolioAddress,
      abi: PORTFOLIO_MANAGER_ABI,
      functionName: 'deposit',
      args: ['0x0000000000000000000000000000000000000000', ethValue],
      value: ethValue,
    })
  }

  function renderBalance() {
    const rawBalance = accountBalance.data?.value ?? BigInt(0)
    const balance = parseFloat(formatEther(rawBalance))

    if (balance < 0.000001) {
      return (
        <>
          <h2>0.00</h2>
          <h4>{chain?.nativeCurrency.symbol ?? 'ETH'}</h4>
          <span className="mt-1 text-xs text-destructive">balance muy bajo</span>
        </>
      )
    }

    let decimals = 2
    if (balance < 1) {
      const str = balance.toString()
      const [, dec] = str.split('.')
      if (dec) {
        const firstNonZero = dec.search(/[^0]/)
        decimals = Math.max(firstNonZero + 3, 2)
        decimals = Math.min(decimals, 18)
      }
    }

    return (
      <>
        <h2>{balance.toFixed(decimals)}</h2>
        <h4>{chain?.nativeCurrency.symbol ?? 'ETH'}</h4>
        {portfolioBalance && (
          <span className="mt-1 text-xs text-muted-foreground">
            Portfolio: {parseFloat(formatEther(portfolioBalance)).toFixed(4)} {chain?.nativeCurrency.symbol ?? 'ETH'}
          </span>
        )}
      </>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          depositar {chain?.nativeCurrency.symbol ?? 'ETH'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 'create' ? 'Crear Portfolio' : `Depositar ${chain?.nativeCurrency.symbol ?? 'ETH'}`}
          </DialogTitle>
          <DialogDescription className="text-left">
            {step === 'create'
              ? 'Primero necesitas crear un portfolio con un asesor verificado'
              : 'El monto ingresado será depositado en tu portfolio'
            }
          </DialogDescription>
        </DialogHeader>

        {isMounted ? (
          <div className="w-full">
            <div className="flex flex-col text-center mb-6">{renderBalance()}</div>

            {step === 'create' && (
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="advisor">Seleccionar Asesor</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedAdvisor}
                    onChange={(e) => setSelectedAdvisor(e.target.value)}
                  >
                    <option value="">Elige un asesor verificado</option>
                    {VERIFIED_ADVISORS.map((advisor) => (
                      <option key={advisor.address} value={advisor.address}>
                        {advisor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex w-full justify-center">
                  <Button
                    onClick={handleCreatePortfolio}
                    disabled={!selectedAdvisor || isPending || isConfirming}
                  >
                    {isPending || isConfirming ? 'Creando...' : 'Crear Portfolio'}
                  </Button>
                </div>
              </div>
            )}

            {step === 'deposit' && (
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="amount">Cantidad</Label>
                  <Input
                    name="amount"
                    placeholder="0.05"
                    type="number"
                    step="0.001"
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}
                  />
                </div>

                <div className="flex w-full justify-center">
                  <Button
                    onClick={handleDeposit}
                    disabled={!depositAmount || isPending || isConfirming}
                  >
                    {isPending || isConfirming ? 'Depositando...' : 'Depositar'}
                  </Button>
                </div>
              </div>
            )}

            {hash && (
              <div className="flex flex-col items-center pt-8">
                <Link
                  className="flex items-center gap-x-1.5 hover:text-accent"
                  href={`https://${chain?.blockExplorers?.default.name}.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ver tx en explorador <ExternalLinkIcon className="h4 w-4" />
                </Link>
                {isConfirming && (
                  <div>esperando confirmación...</div>
                )}
                {isSuccess && (
                  <div>transacción confirmada</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>cargando...</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

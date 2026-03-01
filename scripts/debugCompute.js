import { computeDeemedDisposal } from '../lib/deemedDisposal.js'

async function run(){
  process.env.TEST_MODE='1'
  const transactions=[
    {
      action: 'Market buy', isBuy:true, isSell:false, dateISO:'2016-05-10', dateObj:new Date('2016-05-10'), ticker:'VUSA', isin:'IE00B3XXRP09', name:'Vanguard S&P 500', quantity:2, priceNative:50, currencyPrice:'EUR', totalNative:100, currencyTotal:'EUR', tradeCurrency:'EUR'
    }
  ]
  const res = await computeDeemedDisposal({ transactions, taxYear:2024 })
  console.log('RESULT', JSON.stringify(res, null, 2))
}
run().catch(e=>{ console.error(e); process.exit(1) })

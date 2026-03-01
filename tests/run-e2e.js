(async function(){
  process.env.TEST_MODE = '1'
  const fs = require('fs')
  const path = require('path')
  const Papa = require('papaparse')

  const route = await import('../app/api/calculate/route.js')
  const computeTaxes = route.computeTaxes
  if(!computeTaxes) throw new Error('computeTaxes not exported')

  const examplesDir = path.join(__dirname, '..', 'examples')
  const files = fs.readdirSync(examplesDir).filter(f => f.endsWith('.csv'))

  let failed = false

  for(const file of files){
    console.log('\n--- Running example:', file)
    const csv = fs.readFileSync(path.join(examplesDir, file), 'utf8')
    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true })
    const rows = parsed.data
    const taxYear = new Date().getFullYear()

    try{
      const out = await computeTaxes({ rows, taxYear })
      console.log('Result summary:', { totalTax: Number(out.totalTax).toFixed(2), rows: out.rows.length })
      // Basic assertions
      if(typeof out.totalTax !== 'number' || !Array.isArray(out.rows)){
        console.error('Invalid result shape')
        failed = true
      }
    }catch(e){
      console.error('Test failed for', file, e.stack || e.message)
      failed = true
    }
  }

  if(failed){
    console.error('\nOne or more tests failed')
    process.exit(2)
  }

  console.log('\nAll example tests passed')
  process.exit(0)
})()

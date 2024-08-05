import { Button } from '@/components/ui'
import { CurrentOrder, Invoice } from '@/components'

import { PosBaseMemo } from '@/components/products/PosBase'
import { useState } from 'react'
import { SortOption } from '@/utils/types'

function Sales() {
  const [sort, setSort] = useState<SortOption>({ option: 'most-saled' })
  return (
    <>
      <div className="flex md:p-5 lg:flex-row flex-col transition-all">
        <PosBaseMemo sort={sort}>
          <div className="flex w-full justify-between ">
            <Button
              onClick={() => setSort({ option: '?sort=none' })}
              className="md:w-32 rounded-sm"
            >
              All
            </Button>
            <Button
              onClick={() => setSort({ option: '?sort=recent' })}
              className="md:w-32 rounded-sm"
            >
              Recent
            </Button>
            <Button
              onClick={() => setSort({ option: 'most-saled' })}
              className="md:w-32  rounded-sm"
            >
              Most
            </Button>
          </div>
        </PosBaseMemo>
        <div className="flex flex-col mt-3 lg:mt-0 lg:w-1/2 lg:ms-4 items-center ">
          <CurrentOrder />
          <Invoice />
        </div>
      </div>
    </>
  )
}

export default Sales

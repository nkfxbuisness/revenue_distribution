import React from 'react'

const Wallet = () => {
  return (
    <>
      <div className="w-3/4  h-screen flex flex-col mx-auto my-5">
        <div className="flex justify-center flex-col gap-2 w-full h-36  bg-blue-600  text-yellow-600 mx-auto rounded-xl px-5 pb-5">
          <span className="text-lg text-white font-semibold text-left pl-4">
            Balance
          </span>
          <span className="text-4xl text-white font-extrabold text-left pl-4">
            $ 2200.66
          </span>
        </div>

        {/* Wallet Transactions  */}
        <p className='text-2xl text-blue-600 py-6 text-left'>Wallet Transactions</p>


        {/* table  */}
        <div className="w-full text-left rounded-md">
          <div className="table w-full ">
            {/* table header  */}
            <div className="table-header-group bg-blue-600 text-white font-semibold ">
              <div class="table-row ">
                <div class="table-cell text-center py-2 px-2 w-1/4">Date</div>
                <div class="table-cell text-center py-2 px-2 border-l-2 border-white w-1/4">
                  Amount
                </div>
                <div class="table-cell text-center py-2 px-2 border-l-2 border-white w-1/4">
                  Transction ID
                </div>
                <div class="table-cell text-center py-2 px-2 border-l-2 border-white w-1/4">
                  Status
                </div>
              </div>
            </div>

            <div className="table-row-group">
              {/* table row  */}
              <div className="table-row bg-white text-sm font-light ">
                <div className="table-cell text-left py-2 px-2 w-1/4 border-b-2 border-blue-50">
                  6th August , 2024
                </div>
                <div className="table-cell text-center py-2 px-2 w-1/4 border-b-2 border-blue-50 font-semibold text-green-500">
                  $ 103.54
                </div>
                <div className="table-cell text-center py-2 px-2 w-1/4 border-b-2 border-blue-50 ">
                  99462283664
                </div>
                <div className="table-cell text-center justify-center py-2 px-2 w-1/4 border-b-2 border-blue-50">
                  <span className="bg-yellow-200 text-yellow-600 rounded-2xl px-2 py-1 font-semibold">
                    pending
                  </span>
                </div>
              </div>

              {/* table row  */}
              <div className="table-row bg-white text-sm font-light ">
                <div className="table-cell text-left py-2 px-2 w-1/4 border-b-2 border-blue-50">
                  7th August , 2024
                </div>
                <div className="table-cell text-center py-2 px-2 w-1/4 border-b-2 border-blue-50 font-semibold text-green-500">
                  $ 103.54
                </div>
                <div className="table-cell text-center py-2 px-2 w-1/4 border-b-2 border-blue-50 ">
                  99462283664
                </div>
                <div className="table-cell text-center justify-center py-2 px-2 w-1/4 border-b-2 border-blue-50">
                  <span className="bg-green-200 text-green-600 rounded-2xl px-2 py-1 font-semibold">
                    success
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet
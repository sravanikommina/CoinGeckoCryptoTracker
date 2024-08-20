
import { useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import {useQuery} from "@tanstack/react-query"

function CoinTable(){
    const [page,setPage]=useState(1);

    const { data, isPending,isError,error} = useQuery({
        queryKey: ['coins', page],
        queryFn: () => fetchCoinData(page,'usd'),
        gcTime:1000*60*2,
        staleTime:1000*60*2
        
      })

    
    if(isError){
        return <div>Error: {error.message}</div>
    }
    return(
       <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vW] mx-auto">
            <div className="w-full bg-yellow-200 flex text-black py-4 px-2 font-semibold items-center justify-center">
                <div className="basis-[35%]">
                    Coin
                </div>
                <div className="basis-[25%]">
                    Price
                </div>
                <div className="basis-[20%]">
                    24h Chage value
                    </div>
                <div className="basis-[20%]">
                    market cap
                </div>
            </div>

            <div className="flex flex-col mx-auto w-[80vw]">
                {isPending && <div>Loading.....Please Hang there</div> }
                {data && data.map((coin)=>{
                    return(
                        <div key={coin.id} className=" w-full flex bg-transparent text-white py-4 px-2 font-semibold ">
                            <div className="flex  items-center justify-start basis-[35%]"> 
                                
                                <div className="w-[5rem] h-[5rem]">
                                    <img src={coin.image} className="w-full h-full"/>
                                </div>
                                <div className="flex flex-col mx-2 justify-center">
                                    <div className="text-3xl">{coin.name}</div>
                                    <div className="text-xl">{coin.symbol}</div>
                                </div>
                            </div>

                            <div className="basis-[25%]">
                                {coin.current_price.toFixed(2)}
                            </div>
                            
                            <div className="basis-[20%]">
                                {coin.price_change_24h.toFixed(3)}
                            </div>

                            <div className="basis-[20%]">
                                {coin.market_cap}
                            </div>
                            
                        </div>
                    )
                })
                }
            </div>

            <div className="flex gap-4 justify-center items-center">
                <button disabled={page===1} onClick={()=>setPage(page-1)} className="btn btn-primary btn-wide text-white text-2xl">Prev</button>
                <button  onClick={()=>setPage(page+1)} className="btn btn-secondary btn-wide text-white text-2xl">Next</button>
            </div>
       </div>
    )
}
export default CoinTable;
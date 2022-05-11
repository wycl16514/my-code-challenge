import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import data_model from '../model/chain'

@inject('chain_coins') @observer 
class CoinsPool extends Component {
  

   render () {
       const {chain_coins} = this.props
       this.chain_coins_store = chain_coins
       this.next_coin_idx =this.chain_coins_store.chain_coins.length


       return (
           <div>
               <h2>My Pool</h2>
               <ul>
                   {
                        this.chain_coins_store.chain_coins.map((item, index) => {
                          return (
                            <li key={index}>
                                <p>description: {item.description}</p>
                                <p>base: {item.base}</p>
                                <p>display: {item.display}</p>
                                <p>name: {item.name}</p>
                                <hr/>
                            </li>
                          )
                         
                       })
                   }
               </ul>
               
               <button onClick={this.add_asset}>Add Asset</button>
               <button onClick={this.remove_asset}>Remove Asset</button>
               <button onClick={this.update_asset}>Update Asset</button>
               <button onClick={this.add_pool}>Add Pool</button>
           </div>
       )
   }


   add_asset= ()=> {
       let new_coin = data_model.get_chain_coin(this.next_coin_idx)
       this.chain_coins_store.addAsset(new_coin)
   }

   remove_asset =()=> {
       let remove_idx = Math.floor(Math.random() * this.chain_coins_store.chain_coins.length)
       let coin_removed = this.chain_coins_store.chain_coins[remove_idx]
       this.chain_coins_store.removeAsset(coin_removed)
   }

   update_asset=()=> {
    let update_idx = Math.floor(Math.random() * this.chain_coins_store.chain_coins.length)
    let coin_updated = this.chain_coins_store.chain_coins[update_idx]
    coin_updated.name = "updated!" + coin_updated.name 
    this.chain_coins_store.updateAsset(coin_updated)
   }

   add_pool = ()=> {
       let coins = data_model.get_chain_coins(this.next_coin_idx, this.next_coin_idx + 3)
       console.log("add pool: ", coins)
       this.chain_coins_store.addPool(coins)
   }
}

export default CoinsPool
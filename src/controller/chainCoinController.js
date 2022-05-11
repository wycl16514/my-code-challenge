import {makeObservable, observable, action, computed} from 'mobx'
import data_model from '../model/chain';

class chain_coins {
    @observable chain_coins = []
    constructor() {
        makeObservable(this)
        this.init_chain_coins()
    }

    init_chain_coins = ()=> {
        let coins = data_model.get_chain_coins(0, 4)
        
        for (let coin of coins) {
            this.chain_coins.push(coin)
        }
    }

    @action.bound addAsset(asset) {
        let coin = this.chain_coins.find(
            (element) => {
               return element.base === asset.base && element.symbol === asset.symbol
            }
        )

        if (!coin) {
            this.chain_coins.push(asset)
        }
    }

    @action.bound updateAsset(asset) {
        let index = this.chain_coins.findIndex(
            (element, index, array) => {
                if (element.base === asset.base && element.symbol === asset.symbol) {
                    return index 
                }

                return -1
            }
        )

        if (index !== -1) {
            this.chain_coins[index] = JSON.parse(JSON.stringify(asset))
        }
    }

    @action.bound removeAsset(asset) {
        let index = this.chain_coins.findIndex(
            (element, index, array) => {
                if (element.base === asset.base && element.symbol === asset.symbol) {
                    return index 
                }

                return -1
            }
        )

        if (index !== -1) {
            this.chain_coins.splice(index, 1)
        }
    }

    @action.bound addPool(assets) {
        for (let asset of assets) {
            this.chain_coins.push(asset)
        }
    }
}

class ChainCoinStore {
    constructor() {
        this.chain_coins = new chain_coins()
    }
}

const  coins_store = new ChainCoinStore()

export default coins_store

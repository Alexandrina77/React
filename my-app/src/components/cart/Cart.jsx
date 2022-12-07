import Product from "./item/Product"
import style from './cart.module.css';

import axios from 'axios';
import { AppContext } from "../../App";

const Cart = (props) => {



    const onAddOverlay = (obj)=>{
        try{
            if (props.overlayItems.find(item => Number(item.id) === Number(obj.id))){
            axios.delete(`https://637f91ca2f8f56e28e904e7d.mockapi.io/cart/${obj.id}`)
            props.setOverlayItems((over) => over.filter(item => Number(item.id) !== Number(obj.id)))

    }
    else{
        axios.post('https://637f91ca2f8f56e28e904e7d.mockapi.io/cart', obj)
        props.setOverlayItems([...props.overlayItems, obj]);
    }
    }
    catch{
        alert('ошибка')
    }
    }
    

    const onAddFav = (objFav)=>{
        try{
            if (props.favtems.find(objId => Number(objId.id) === Number(objFav.id))){
            axios.delete(`https://637f91ca2f8f56e28e904e7d.mockapi.io/favorites/${objFav.id}`)
            props.setFavItems((over) => over.filter(item => Number(item.id) !== Number(objFav.id)))

    }
    else{
         axios.post('https://637f91ca2f8f56e28e904e7d.mockapi.io/favorites', objFav)
        props.setFavItems([...props.favtems, objFav]);
    }
    }
    catch{
        alert('ошибка')
    }
    }


    
    const onSearch =(inputValue)=>{
         props.setSearch(inputValue.target.value);   
    }

    return (
        <div className={style.cart_section}>
            <div className={style.search}>
                <h1>Туры:</h1>
                <div className={style.search_block}>
                    <img src="/img/search.png" alt="поиск"></img>
                    <input onChange={onSearch} placeholder="Поиск"></input>
                </div>
            </div>

            <div className={style.cart}>
                {
                    
                    props.item.filter((item) => item.title.toLowerCase().includes(props.search.toLowerCase()))
                    .map(obj => {
                        return (
                            <Product 
                                key={obj.id}
                                id={obj.id}
                                myId={obj.myId}
                                title={obj.title}
                                price={obj.price}
                                img={obj.img}
                               
                                // isAdded = {
                                //     props.overlayItems.some((objIsAdded)=> 
                                //     objIsAdded.myId === obj.myId)
                                // }

                                // isFav ={
                                //     props.favtems.some((objIsFav)=> 
                                //     objIsFav.myId === obj.myId)
                                // }




                                favBtn={
                                    (favObj) => {
                                        onAddFav(favObj)
                                    }
                                }

                                onPlus={(cartObj)=>{
                                    console.log(cartObj)
                                    onAddOverlay(cartObj)
                                    
                                }   
                                }
                            />
                        )
                    })

                }

            </div>
        </div >
    )
}

export default Cart
import React from "react";
import style from './favorites.module.css';
import axios from 'axios';
import FavItem from './itemFav/FavItem';
import { AppContext } from "../../App";

const Favorites=(props)=>{

    const context = React.useContext(AppContext);

    //добавление в корзину 
    const onAddOverlay = (obj)=>{
        // по этому адресу
     axios.post('https://637f91ca2f8f56e28e904e7d.mockapi.io/cart', obj)
     //отправь данные эти
     context.setOverlayItems([...context.overlayItems, obj]);
    }

//удаление из избраннрого 
    const onDeleteFav = (id)=>{
        
       axios.delete(`https://637f91ca2f8f56e28e904e7d.mockapi.io/favorites/${id}`)
       context.setFavItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }


return(
    <div className={style.cart_section}>
    <div>
        <h2>Избранные товары</h2>
    </div>
     
            <div className={style.cart}>
                {
                    context.favtems.map(obj => {
                        return (
                            <div>
                                <FavItem 
                                key={obj.id}
                                id={obj.id}
                                 title={obj.title}
                                 price={obj.price}
                                 img={obj.img}
                               
                                 onDeleteFav={
                                     (id) => {
                                        onDeleteFav(id)
                                     }
                                 }

                                 onPlus={(cartObj)=>{
                                    onAddOverlay(cartObj)
                                    
                                }    
                                }
                             />
                            </div>
                        )
                    })
                }

            </div>
        </div >
)
}

export default Favorites
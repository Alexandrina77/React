import './App.css';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Overlay from './components/overlay/Overlay';
import React from 'react';
import axios from 'axios';
import Favorites from './components/favorites/Favorites';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';

export const AppContext = React.createContext({})

function App() {

    //состояние корзины
    const [overlayOpen, setOverlayOpen] = React.useState(false)
    //хранение данных туров
    const [tyrs, setTyrs] = React.useState([])
    //для хранения объектов корзины
    const [overlayItems, setOverlayItems] = React.useState([])
    //для поиска
    const [search, setSearch] = React.useState('')
    //для избранного 
    const [favtems, setFavItems] = React.useState([])


    React.useEffect(() => { 
        async function axiosData(){
            
        const tyrsData = await axios.get('https://637f91ca2f8f56e28e904e7d.mockapi.io/tyrs')
        const cartData = await axios.get('https://637f91ca2f8f56e28e904e7d.mockapi.io/cart')
        const favoritesData = await axios.get('https://637f91ca2f8f56e28e904e7d.mockapi.io/favorites')

          setTyrs(tyrsData.data)
          setOverlayItems(cartData.data)
          setFavItems(favoritesData.data)
        }
      axiosData();
       
     
    }, [])

    const deleteItem = (id) => {
        console.log(id);
        axios.delete(`https://637f91ca2f8f56e28e904e7d.mockapi.io/cart/${id}`)
        setOverlayItems((over) => over.filter(item => Number(item.id) !== Number(id)))


    }

    const isAdded =(myId) =>{
        return overlayItems.some((objIsAdded)=> objIsAdded.myId === myId)
    }

    const isFav =(myId) =>{
        return favtems.some((objIsFav)=> objIsFav.myId === myId)
    }

    return (
        <AppContext.Provider 
        value={{
            tyrs, 
            setTyrs,
            overlayItems, 
            setOverlayItems,
            favtems,
            setFavItems,
            isAdded,
            isFav
        }}>
        <div className="app">

            {overlayOpen ? <Overlay

                total_price={
                    overlayItems.reduce((totalElements=overlayItems.length, objPrice) => 
                    totalElements + objPrice.price, 0)
                }

                deleteItem={deleteItem}
                overlayProp={overlayItems}
                closeOverlay={() => setOverlayOpen(false)} />
                : null}

        
            <Header openOverlay={() => setOverlayOpen(true)} overlayItems={overlayItems} />
            <Routes>
                <Route path='/favorites'
                    element=
                    {<Favorites
                       // favtems={favtems}
                       // setFavItems={setFavItems}
                        //overlayItems={overlayItems}
                       // setOverlayItems={setOverlayItems}
                        //item={tyrs}
                    />}
                />
                <Route path='/'
                    element={
                       <Home
                       item={tyrs}
                       overlayItems={overlayItems}
                       setOverlayItems={setOverlayItems}
                       setSearch={setSearch}
                       search={search}
                       favtems={favtems}
                       setFavItems={setFavItems}
                       />
                    }
                />
            </Routes>
            <Footer />
        </div>
        </AppContext.Provider>
    );
}
export default App
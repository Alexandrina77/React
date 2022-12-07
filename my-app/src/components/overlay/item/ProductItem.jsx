import style from './productItem.module.css';

const ProductItem = (props) => {


    return (
        <div className={style.product_item}>
            <img className={style.product_img} src={props.img} alt=''></img>
            <h3 className={style.product_title}> {props.title}
                <br />
                <span className={style.product_price}>{props.price}</span>
            </h3>
            <button onClick={()=>props.deleteItem(props.id)} className={style.close_btn} >X</button>
        </div>
    )
}
export default ProductItem
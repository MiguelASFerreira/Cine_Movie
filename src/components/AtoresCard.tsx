import './AtoresCard.css'

const imageUrl = import.meta.env.VITE_IMG_ATOR;

const AtorCard = ({ator}) => {
    return (
        <div className="casts">
            
        <div className='casts_item'>
            <div className="carts_item_img" style={{backgroundImage: `url(${imageUrl} ${ator.profile_path})`}}>
            <img src={imageUrl + ator.profile_path} alt={ator.title} />
            </div>
            <p className="casts_item_name">{ator.name}</p>
            <p className="casts_item_name casts_item_character">{ator.character.slice(0, 200)}</p>
            
           
        </div>
        </div>
    //     <div className="casts">
    //     {cast.map((item, i) => (
    //         <div key={i} className="casts_item">
    //             <div className="casts_item_img" style={{backgroundImage: `url(${imageUrl(item.profile_path)})`}}></div>
    //             <p className="casts_item_name">{item.name}</p>
    //         </div>
    //     ))}
    // </div>        
    );
}
 
export default AtorCard;
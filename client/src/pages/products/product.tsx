
import { useNavigate } from 'react-router-dom';
export const ProductCard = ({ data, full }: any) => {
  const navigate = useNavigate();
  return (
    <div className={`${full?"col-12 mx-auto":"col-11 col-lg-3 col-md-4 col-sm-6 mb-3 mx-auto"}`}>
      <div className="product cursor-pointer"  style={ {minHeight:300}} onClick={()=>{navigate(`/product/${data[3]}`)}}>
        <img src={data[4]!="None"?data[4]:"https://picsum.photos/seed/picsum/200/300"} />
        <div><h2>{data[3]}</h2>
          <div style={{borderRadius:100, width:20, height:20, backgroundColor:data[6], position:"absolute", top:10, right:10}} ></div>
          <p className="price">Price: {data[2]}$</p>
          <p className="price">Weight: {data[5]}Kg</p>
          <p className="descr">{data[8]}</p>
          <br />
        </div>
      </div>
    </div>
  );
};
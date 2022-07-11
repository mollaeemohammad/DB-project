
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
export const ProductCard = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <div className="col-11 col-lg-3 col-md-4 col-sm-6 mb-3 mx-auto" >
      <div className="product cursor-pointer"  style={ {minHeight:300}} onClick={()=>{navigate(`/product/${data[3]}`)}}>
        <img src={data[4]!="None"?data[4]:"https://picsum.photos/seed/picsum/200/300"} />
        <div><h2>{data[3]}</h2>
          <p className="price">{data[2]} $</p>
          <p className="descr">{data[5]}</p>
          <br />
        </div>
      </div>
    </div>
  );
};
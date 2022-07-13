
import { Link, useNavigate } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
export const OrderCard = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <div className="col-12" >
      <FlexboxGrid className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
        <FlexboxGrid.Item colspan={4}>{data.id}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>{data.status}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>{data.order_date }</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>{data.estimate_date}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}>{data.total_cost}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={4}><Link to={`/order/${data.id}`}>View Order</Link></FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};
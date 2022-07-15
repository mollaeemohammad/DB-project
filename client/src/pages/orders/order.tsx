
import Field from 'components/form/field';
import TextAreaField from 'components/form/textarea-field';
import { ProductCard } from 'pages/products/product';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonToolbar, FlexboxGrid, Form, Schema, SelectPicker, Timeline } from 'rsuite';
import { isAdmin, isStore } from 'util/helper';
import { showToast } from 'util/toast';
import { addProblemApi, fetchOrder, fetchProblems, updateStatusApi } from './api/orders';

const { StringType, NumberType } = Schema.Types;
const model = Schema.Model({
  problem_type: StringType().isRequired(),
});

export const Order = () => {
  const navigate = useNavigate();
  const { ID } = useParams();

  const [orderData, setOrderData] = useState<any>([]);
  const [problems, setProblems] = useState<any>([]);


  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>();
  const [formValue, setFormValue] = useState<any>();
  const [store, setStore] = useState(isStore());
  const [admin, setAdmin] = useState(isAdmin());
  

  
  const handleSubmit = useCallback(async () => {
    if (formRef.current && !formRef.current.check()) {
      console.log(formError, 'Form Error');
      return;
    }
    
    console.log(formValue, 'Form Value');

    const res = await addProblemApi({...formValue, store_id:orderData[0].store_id, order_id:ID });
    if (res==1) {
      showToast("Note Added Successfully", "success");
      const problemsData = await fetchProblems({ order_id: ID });
      console.log(problemsData);
      setProblems(problemsData);
    } else if (res == -1) {
      showToast("Error adding note", "error");
    }
  }, [formValue, orderData]);

  const [trigger, setTrigger] = useState(true);
  const handleStatus = useCallback(async (status: string) => {
    const res = await updateStatusApi({ status: status, order_id: ID });
    if (res == 1) {
      showToast("status updated", "success");
      setTrigger(!trigger);
    } else {
      showToast("error updating status", "error");
      
    }
  },[trigger]);
  useEffect(() => {
    if (!ID) return;
    (async () => {
      
      const data = await fetchOrder({order_id:ID});
      setOrderData(data.map((item: any) => {
        return (
          {
            order_id: item[0],
            order_status: item[1],
            // order_id: item[2],
            // order_id: item[3],
            estimate_date: item[4],
            total_price: item[5],
            order_date: item[6],
            // order_id: item[6],
            // order_id: item[7],
            // order_id: item[8],
            // order_id: item[9],
            // order_id: item[10],
            // order_id: item[11],
            count: item[12],
            // order_id: item[13],
            // order_id: item[14],
            // order_id: item[15],
            regular_price: item[15],
            name: item[16],
            picture: item[17],
            weight: item[18],
            color: item[19],
            dimensions: item[20],
            description: item[21],
            store_id: item[22],
            store_name: item[23],
            // store: item[24],
            // store: item[25],
            // sda: item[26],
            discount_percentage: item[30],
          }
        );
        
      }));

      const problemsData = await fetchProblems({ order_id: ID });
      console.log(problemsData);
      setProblems(problemsData);

    })()
  }, [trigger]);
  

    return (
      <div className="col-12" >
        <div className="page-title-box">
          {ID && orderData.length && <h4 className="page-title">Order #{ID}, {orderData[0]?.order_status}</h4>}
        </div>
        <div className="row product-list mt-4">
          <FlexboxGrid className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
            <FlexboxGrid.Item colspan={6}>Picture</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Store Name</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Sales Price</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Count</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>Total</FlexboxGrid.Item>
          </FlexboxGrid>
          {orderData.length && orderData.map((item: any) => {
            return (
              <FlexboxGrid key={`${item.id} ${item.store_id}`} className="mt-4 mb-1 font-18 text-center d-flex" style={{alignItems:"center", justifyContent: "center"}}>
              <FlexboxGrid.Item colspan={6}><ProductCard full={true} data={[item.id, "0.0", item.regular_price, item.name, item.picture, item.weight, item.color, item.dimensions, item.description]} /></FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.store_name}</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.regular_price * (1- item.discount_percentage)}$</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.count}</FlexboxGrid.Item>
              <FlexboxGrid.Item colspan={4}>{item.count* (item.regular_price * (1- item.discount_percentage))}$</FlexboxGrid.Item>
              </FlexboxGrid>
              
            );
          })
          }
        </div>
        <div className="page-title-box mt-4 mb-5">
          {orderData.length &&
          <>
            <h4 className="page-title">Total: {orderData[0]?.total_price}$</h4>
            <h4 className="page-title">Order Date: {orderData[0]?.order_date}</h4>
            <h4 className="page-title mb-2">Estimate Date: {orderData[0]?.estimate_date}</h4>
            {(!admin && !store && orderData[0]?.order_status!="DELIVERED") && <Button appearance="default" style={{marginRight:6}} onClick={() => { handleStatus("DELIVERED"); }}>Received?</Button>}
            {(!admin && !store && orderData[0]?.order_status!="CANCELED") && <Button appearance="default" onClick={() => { handleStatus("CANCELED"); }}>Cancel?</Button>}
            {(admin || store) && <div>Set status to: {orderData[0]?.order_status != "DELIVERED" && <Button appearance="default" style={{ marginRight: 6 }} onClick={() => { handleStatus("DELIVERED"); }}>Delivered</Button>} {orderData[0]?.order_status != "PREPARING" && <Button style={{ marginRight: 6 }} appearance="default" onClick={() => { handleStatus("PREPARING"); }}>Preparing</Button>}  {orderData[0]?.order_status!="CANCELED" && <Button appearance="default" onClick={() => { handleStatus("CANCELED"); }}>Cancel</Button>} </div>}
          </>
          }
        </div>

        {/* form  */}

        <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formError={formError} model={model} formDefaultValue={formValue} style={{ margin: "auto"}}>
              <div className="show-grid mb-4">
                <FlexboxGrid>
                  <FlexboxGrid.Item colspan={14} style={{ paddingRight: 10 }}>
                
                    <Field name="problem_type" label="Problem Type" accepter={SelectPicker} data={[
                      { label: "Delay", value: "DELAY" },
                      { label: "Damage", value: "DAMAGE" },
                      { label: "Others", value: "OTHERS" },
                    ]}
                    />
                    <TextAreaField rows={5} name="discussion" label="Note:" />
                
                    <ButtonToolbar style={{ marginTop:"20px", float: "right" }}>
                      <Button  appearance="default" type="submit" onClick={handleSubmit}>Submit Note</Button>
                    </ButtonToolbar>
                  </FlexboxGrid.Item>
                  {problems &&
                    <FlexboxGrid.Item colspan={14} style={{ paddingRight: 10 }}>
                      <Timeline align="left" className="font-20 mb-5">
                    {problems.map((item: any, index: number) => {
                      return (
                        <Timeline.Item key={index}>
                          <p className="mb-1">{item[2]}</p>
                          <p className="mb-2">{item[4]}</p>
                        </Timeline.Item>
                      );
                    })
                  }
                  </Timeline>
                  </FlexboxGrid.Item>}
                  
                </FlexboxGrid>
              </div>

            
            </Form>
      </div>
    );

};
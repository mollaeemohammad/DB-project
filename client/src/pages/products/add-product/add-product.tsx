import TextField from "components/form/textfield";
import TextAreaField from "components/form/textarea-field";
import Field from "components/form/field";
import { FC, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonToolbar, Form, Input, MaskedInput, Modal, Schema, Uploader } from "rsuite";
import { FlexboxGrid, SelectPicker } from 'rsuite';
import { isAdmin } from 'util/helper';
import { COLORS } from "util/storage";
import { addProduct } from "core/api";
import { addProductModel } from "models";
import { fetchCategories } from "pages/category/api/categories";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(),
  price: NumberType().isRequired(),
  count: NumberType().isRequired(),
  store_id: NumberType().isRequired(),
  category_id: NumberType().isRequired(),
  picture: StringType(),
  weight: NumberType(),
  color: StringType().isRequired(),
  dimensions: StringType(),
  description: StringType(),
  discount_percentage: StringType().isRequired(),
});

const AddProduct = ({defaultValue}:any) => {
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>();
  const [formValue, setFormValue] = useState<any>({});
  const [addAddressesButtonLoading, setAddAddressesButtonLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const addProductApi = async (query: addProductModel) => { 
    try{
      const { status, data } = await addProduct(query);
      if (status === 200) {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
    return [];
  }
  
  const [uploadedFilesUrl, setUploadedFilesUrl] = useState<any>();
  const handleSubmit = useCallback(async () => {
    if (formRef.current && !formRef.current.check()) {
      console.log(formError, 'Form Error');
      return;
    }
    
    console.log(formValue, 'Form Value');
    const randomImage = await fetch('https://picsum.photos/200/300?random=1');
    console.log(randomImage);

    addProductApi({...formValue, picture:randomImage.url});
  },[uploadedFilesUrl, formValue]);
  
  const initCategories = async() => {
    const data = await fetchCategories();
    console.log(data);
    if (data.length) {
      setCategories(data.map((item: any) => ({ label: item[1], value: item[0] })));
    }
  };
  useEffect(() => {
    (async () => {
      initCategories();
    })();
  },[]);

  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Add Product</h4>
            </div>            
          </div>

          <div className="col-12">
            <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formError={formError} model={model} formDefaultValue={defaultValue} style={{ margin: "auto", width: "90%"}}>
              <div className="show-grid mb-4">
                <FlexboxGrid>
                  <FlexboxGrid.Item colspan={12} style={{ paddingRight: 10 }}>
                    <TextField type="number" name="store_id" label="Store ID" disable={isAdmin()?false:true} />
                    <TextField name="name" label="Name" />
                    <TextField type="number" name="price" label="Price" />
                    <TextAreaField  name="description" label="Description" />
                    <TextField name="weight" label="Weight" />
                    <Field accepter={MaskedInput}
                      showMask={true}
                      keepCharPositions={true}
                      placeholderChar={'_'}
                    mask={[/\d/, /\d/, '*', /\d/, /\d/, '*', /\d/, /\d/]} guide={true} name="dimensions" label="Dimensions" />
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item colspan={12} style={{ paddingLeft: 10 }}>
                    <TextField type="number" name="count" label="Count" />
                    <Field name="category_id" label="Category" accepter={SelectPicker}  data={categories} />
                    <Field name="color" label="Color" accepter={SelectPicker} data={COLORS}
                      renderMenuItem={(label:string, item:any) => {
                        return (
                          <div>
                            <div className="d-flex" style={{alignItems:"center"}}><span style={{width:15, height:15, borderRadius:100, background:`${label}`, display:"inline-block", marginRight:10}} /> {label}</div>
                          </div>
                        );
                      }} />
                    <TextField name="discount_percentage" label="Discount Percentage" />
                    {/* <Uploader onChange={(fileList) => handleFileUpload(fileList, "C5")} fileListVisible={false} disableMultipart={true} multiple={false} action=""><span>{uploadedFilesUrl?.C5?.Name ?? "آپلود"}</span></Uploader> */}
                    {/* <TextField name="picture" label="Picture" disabled /> */}
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </div>

            
              <ButtonToolbar>
                <Button style={{ width:"40%", margin:"auto", marginLeft:"5%",marginTop:"40px" }} appearance="default" type="submit" onClick={handleSubmit} loading={addAddressesButtonLoading} disabled={addAddressesButtonLoading}>Add Product</Button>
              </ButtonToolbar>
            </Form>
          </div>

        </div>
      </div>
      
    </div>);
};

export default AddProduct;

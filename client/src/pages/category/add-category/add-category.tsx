import TextField from "components/form/textfield";
import { FC, forwardRef, useEffect, useRef, useState } from "react";
import { Button, ButtonToolbar, Form, Schema } from "rsuite";
import { FlexboxGrid } from 'rsuite';
import { addCategory } from "core/api";
import { addCategoryModel } from "models";
import { showToast } from './../../../util/toast';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(),
});

const AddCategory = ({defaultValue}:any) => {
  const formRef = useRef<any>();
  const [formError, setFormError] = useState<any>();
  const [formValue, setFormValue] = useState<any>({});
  const [addAddressesButtonLoading, setAddAddressesButtonLoading] = useState(false);

  const addCategoryApi = async (query: addCategoryModel) => {
    try {
      const { status, data } = await addCategory(query);
      if (status === 200) {
        console.log(data);
        showToast("Category added successfully", "success");
        return;
      }
    } catch (e) {
      console.log(e);
    }
    showToast("Category not added", "error");
    return [];
  };

  const handleSubmit = async() => {
    if (formRef.current && !formRef.current.check()) {
      console.log(formError,'Form Error');
      return;
    }
    
    console.log(formValue, 'Form Value');
    setAddAddressesButtonLoading(true);
    await addCategoryApi(formValue);
    setAddAddressesButtonLoading(false);
  };

  return (
    <div className="content-page">
      <div className="content">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="page-title-box">
              <h4 className="page-title">Add Category</h4>
            </div>            
          </div>

          <div className="col-12">
            <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formError={formError} model={model} formDefaultValue={defaultValue} style={{ margin: "auto", width: "90%"}}>
              <div className="show-grid mb-4">
                <FlexboxGrid>
                  <FlexboxGrid.Item colspan={12} style={{ paddingRight: 10 }}>
                    <TextField name="name" label="Name" />
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item colspan={12} style={{ paddingLeft: 10 }}>
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

export default AddCategory;

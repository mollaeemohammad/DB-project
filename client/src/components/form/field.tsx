import { forwardRef } from "react";
import { Form } from "rsuite";

const Field = forwardRef((props:any, ref:any) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control style={{width:"100%"}} name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});
Field.displayName = "Field";

export default Field;
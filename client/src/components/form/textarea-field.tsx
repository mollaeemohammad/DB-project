import { forwardRef } from "react";
import { Form, Input } from "rsuite";

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} ref={ref} as="textarea" />);
Textarea.displayName = "Textarea";

export default function TextAreaField(props:any) {
  const { name, label, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control rows={2} style={{width:"100%"}} name={name} accepter={Textarea} {...rest}/>
    </Form.Group>
  );
}
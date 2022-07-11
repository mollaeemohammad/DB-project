import { Form } from "rsuite";

export default function TextField(props:any) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control style={{width:"100%"}} name={name} accepter={accepter} {...rest} />
      
    </Form.Group>
  );
}
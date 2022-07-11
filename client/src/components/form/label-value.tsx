import { Form, Input } from "rsuite";

export default function LabelValue(props:any) {
  const { name, label, value, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`}>
      <Form.ControlLabel style={{ fontWeight:"bold"}}>{label}</Form.ControlLabel>
      <Form.Control plaintext style={{width:"100%"}} value={value} name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}
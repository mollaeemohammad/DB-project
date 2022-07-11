import { Form, Button } from "rsuite";

export default function TextFieldButton(props:any) {
  const { name, label, accepter, onClick, buttonText, className, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control className={`${className} text-field-with-button-wrapper`} style={{ width: "100%", display:"inline-block"}} name={name} accepter={accepter} {...rest} />
      <Button style={{backgroundColor:"#000", color:"#fff", width:"30%", marginRight:"5%", display:"inline-block"}} appearance="default" type="submit" onClick={onClick}>{buttonText}</Button>
    </Form.Group>
  );
}